// const { Op } = require("sequelize");
const db = require('../../models');
const DBServices = require('../../services/db-services');
const { SendEmail, EmailTemplate, SetUserTypeAsName } = require('../../services');
// const dbServices = require('../../services/db-services');
// const dayjs = require('dayjs');

module.exports = {

  SendMessageToSW: async (req, res) => {
    //@ Last Message is true means don't less connect on it
    let lastMessage = req.body.lastMessage;
    delete req.body.lastMessage;
    //@/==================================================//
    let response = await DBServices.PostData(db.sw_message, req.body);
    //@ if it successfully saved in db then sent Email to SW
    let senderName = '';
    let receiverName = '';
    if (response.status) {

      //@ Less connect and update total ===========================@//
      if (!lastMessage) {
        //# Add Less into DB
        let cId = await DBServices.PostData(db.users_connects, { user_ref_id: req.body.pr_user_ref_id, connects_out: process.env.CONNECT_PER_MESSAGE });
        //# Get Total
        let totalConnects = await DBServices.GetData(db.users_connects_total, { attribute: ['id', 'connects'], where: { user_ref_id: req.body.pr_user_ref_id } });
        let remainingConnects = (totalConnects.data.connects - parseInt(process.env.CONNECT_PER_MESSAGE));
        //# Update total with less 1 (or what is set in env file)
        DBServices.UpdateDataById(db.users_connects_total, { id: totalConnects.data.id, connects: remainingConnects });
        response.remainingConnects = remainingConnects;
        response.connectsId = cId.id;
      }//End if condition
      //@==========================================================@//

      let receiver_sw = await DBServices.GetData(db.users, { attributes: ['first_name', 'last_name', 'email'], where: { id: req.body.sw_user_ref_id } });
      let sender_ndis_or_sm = await DBServices.GetData(db.users, { attributes: ['id', 'first_name', 'last_name', 'type'], where: { id: req.body.pr_user_ref_id } })

      //# Getting company name if type is ndis
      //# Otherwise get user name
      receiverName = (receiver_sw.data.first_name + ' ' + receiver_sw.data.last_name).trim();
      if (sender_ndis_or_sm.data.type === 'ndis') {
        let companyName = await DBServices.GetData(db.ndis_provider, { attributes: ['company_name'], where: { user_ref_id: sender_ndis_or_sm.data.id } });
        senderName = companyName.data.company_name;
      } else {
        senderName = (sender_ndis_or_sm.data.first_name + ' ' + sender_ndis_or_sm.data.last_name).trim();
      }//End if condition
      //# Send email to SW
      SendEmail({
        to: `${receiverName} <${receiver_sw.data.email}>`,
        subject: `${senderName} sent you a message on ${process.env.COMPANY_NAME}`,
        html: EmailTemplate(`${senderName}`, `Sent you a message By ${process.env.COMPANY_NAME}`, `
          <div style="white-space: pre-wrap">${req.body.message}</div>
          <div style="text-align: center;margin-top:10px">
            <a target="_blank" href="${process.env.MESSAGE_LIST_PATH_FOR_EMAIL}" style='margin:0px auto;background:#${process.env.PRIMARY_COLOR}; padding:10px; border-radius:5px;color:#fff;text-decoration: none;'>Go To The Message Details</a>
          </div>
        `)
      });
      //# Less connect
    }//End if condition
    //# Setting Success megs
    response.successNotify = true;
    response.successTitle = 'Success';
    response.successMsg = `Message has been sent to ${receiverName}`;
    response.successNotifyType = 'notify';
    res.status(200).json(response);
  },//End function

  GetMsgListSW: async (req, res) => {
    // console.log(req.body);
    let response = await DBServices.GetDataList(db.sw_message, {
      where: { sw_user_ref_id: req.body.currentLoginUser },
      attributes: ['id', 'pr_ref_id', 'pr_user_ref_id', 'type', 'message', 'createdAt'],
      include: { model: db.users, as: 'prUserData', attributes: ['id', 'first_name', 'last_name', 'profile_image'] },
    });//End Get function
    // res.status(200).json(response);return false;

    if (response.status) {
      //@ Sort by provider and messages within it
      let newData = {};
      let key = 1;
      // console.log(response.data[0]);
      response.data.forEach(e => {
        let userId = e.prUserData.id;
        if (!newData[userId]) {
          let ud = SetUserTypeAsName({ ...e.prUserData.dataValues, messageData: [] });
          newData[userId] = { ...ud, label: ud.full_name, key: key };
          key++;
        }//End if condition
        let dt = JSON.parse(JSON.stringify(e));
        delete dt.prUserData;
        newData[userId].messageData.push(dt);
      });
      let newArrData = [];
      Object.keys(newData).forEach(e => { newArrData.push(newData[e]) });
      response.data = newArrData;
    }//End condition
    res.status(200).json(response);
  },//End function

  SendMessageToProvider: async (req, res) => {
    let response = await DBServices.PostData(db.sw_message, req.body);
    //@ if it successfully saved in db then sent Email to SW
    let receiverName = '';
    let senderName = '';
    if (response.status) {

      let receiver_ndis_or_sm = await DBServices.GetData(db.users, { attributes: ['first_name', 'last_name', 'email'], where: { id: req.body.pr_user_ref_id } });
      let sender_sw = await DBServices.GetData(db.users, { attributes: ['id', 'first_name', 'last_name', 'type'], where: { id: req.body.sw_user_ref_id } })

      //# Getting company name if type is ndis
      //# Otherwise get user name
      senderName = (sender_sw.data.first_name + ' ' + sender_sw.data.last_name).trim();
      if (receiver_ndis_or_sm.data.type === 'ndis') {
        let companyName = await DBServices.GetData(db.ndis_provider, { attributes: ['company_name'], where: { user_ref_id: receiver_ndis_or_sm.data.id } });
        receiverName = companyName.data.company_name;
      } else {
        receiverName = (receiver_ndis_or_sm.data.first_name + ' ' + receiver_ndis_or_sm.data.last_name).trim();
      }//End if condition
      //# Send email to Provider
      SendEmail({
        to: `${receiverName} <${receiver_ndis_or_sm.data.email}>`,
        subject: `${senderName} replied you on ${process.env.COMPANY_NAME}`,
        html: EmailTemplate(`${senderName}`, `Sent you a message By ${process.env.COMPANY_NAME}`, `
          <div style="white-space: pre-wrap">${req.body.message}</div>
          <div style="text-align: center;margin-top:10px">
            <a target="_blank" href="${process.env.MESSAGE_LIST_PATH_FOR_EMAIL}" style='margin:0px auto;background:#${process.env.PRIMARY_COLOR}; padding:10px; border-radius:5px;color:#fff;text-decoration: none;'>Go To The Message Details</a>
          </div>
        `)
      });
    }//End if condition
    //# Setting Success megs
    response.successNotify = true;
    response.successTitle = 'Success';
    response.successMsg = `Message has been sent to ${receiverName}`;
    response.successNotifyType = 'notify';
    res.status(200).json(response);
  },//End function

  GetMsgListProvider: async (req, res) => {
    let response = await DBServices.GetDataList(db.sw_message, {
      where: { pr_user_ref_id: req.body.currentLoginUser },
      attributes: ['id', 'sw_ref_id', 'sw_user_ref_id', 'type', 'message', 'createdAt'],
      include: { model: db.users, as: 'swUserData', attributes: ['id', 'first_name', 'last_name', 'profile_image'] },
    });//End Get function

    if (response.status) {
      //@ Sort by SW and messages within it
      let newData = {};
      let key = 1;
      response.data.forEach(e => {
        let userId = e.swUserData.id;
        if (!newData[userId]) {
          let ud = SetUserTypeAsName({ ...e.swUserData.dataValues, messageData: [] });
          newData[userId] = { ...ud, label: ud.full_name, key: key };
          key++;
        }//End if condition
        let dt = JSON.parse(JSON.stringify(e));
        delete dt.swUserData;
        newData[userId].messageData.push(dt);
      });
      let newArrData = [];
      Object.keys(newData).forEach(e => { newArrData.push(newData[e]) });
      response.data = newArrData;
    }//End condition
    res.status(200).json(response);
  },//End function

}//End Export