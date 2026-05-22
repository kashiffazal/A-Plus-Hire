const db = require('../../models');
const DBServices = require('../../services/db-services');
const { MultiFieldSeparate, StringToArrForDB } = require('../../services');

module.exports = {

  AddPackagePost: async (req, res) => {
    let response = '';
    let dt = req.body;
    //@ Setting List
    let list = MultiFieldSeparate(dt.list);
    dt.list_icon = list.icon;
    dt.list_label = list.label;
    dt.list_strike = list.strike;
    dt.is_free_plan = dt.is_free_plan ? true : false;
    if (!dt.id) {
      dt.currency = '$';
      dt.status = 'Active';
    }//End if condition
    // console.log(dt);
    response = await DBServices.PostOrUpdate(db.packages, dt);
    //# Setting Success megs
    response.successNotify = true;
    response.successTitle = 'Success';
    response.successMsg = `Package has been ${dt.id ? 'updated' : 'added'} successfully`;
    response.successNotifyType = 'notify';
    response.data = dt;
    res.status(200).json(response);
  },//End function

  PackageList: async (req, res) => {
    let response = await DBServices.GetDataList(db.packages, {
      attributes: ['id', 'name', 'is_free_plan', 'connects', 'currency', 'regular_price', 'sale_price', 'is_default', 'status', 'createdAt']
    });
    response.data.forEach((item, i) => {
      // item.trial_duration = (item.is_trial && item.trial_duration) ? item.trial_duration + ' Days' : '-';
      // item.dataValues.monthly_price_format = item.monthly_sale_price ? 'Sale: ' + item.currency + item.monthly_sale_price + ' |  Regular: ' + item.currency + item.monthly_price : item.currency + item.monthly_price;
      // item.dataValues.yearly_price_format = item.yearly_sale_price ? 'Sale: ' + item.currency + item.yearly_sale_price + ' | Regular: ' + item.currency + item.yearly_price : item.currency + item.yearly_price;
      item.is_free_plan = item.is_free_plan ? 'Free' : '-';
      item.dataValues.regular_price_format = item.sale_price ? 'Sale: ' + item.currency + item.sale_price + ' |  Regular: ' + item.currency + item.regular_price : item.currency + item.regular_price;
    });
    res.status(200).json(response);
  },//End function

  PackageListForWeb: async (req, res) => {
    //@ Setting Where condition
    let where = { status: 'Active' }
    //@ If packages is fetched for Portal then avoid Free plan 
    if (req.params.isPortal === 'true') { where['is_free_plan'] = false; }//End if condition

    let response = await DBServices.GetDataList(db.packages, { where });
    if (response.status) {
      response.data.forEach((item, i) => { response.data[i].list = JSON.parse(item.list); })
      response.data.reverse();
    }//End if condition
    res.status(200).json(response);
  },//End function

  PackageViewDetails: async (req, res) => {
    let response = await DBServices.GetData(db.packages, {
      where: { id: req.params.id },
      include: [
        { model: db.users, as: 'createdByFromUser', attributes: ['first_name', 'last_name'] },
        { model: db.users, as: 'updatedByFromUser', attributes: ['first_name', 'last_name'] },
      ]
    });
    response.data.list = response.data.list ? JSON.parse(response.data.list) : {};
    response.data.createdBy = response.data.createdByFromUser ? response.data.createdByFromUser.first_name + ' ' + response.data.createdByFromUser.last_name : '';
    response.data.updatedBy = response.data.updatedByFromUser ? response.data.updatedByFromUser.first_name + ' ' + response.data.updatedByFromUser.last_name : '';
    // console.log(response.data);
    res.status(200).json(response);
  },//End function

  PackageFormData: async (req, res) => {
    let response = await DBServices.GetData(db.packages, {
      where: { id: req.params.id }
    });
    response.data.list = JSON.parse(response.data.list);
    res.status(200).json(response);
  },//End function

  UpdateStatus: async (req, res) => {
    let response = await DBServices.UpdateDataById(db.packages, { id: req.params.id, status: req.params.status });
    //# Setting Success megs
    response.successNotify = true;
    response.successTitle = 'Success';
    response.successMsg = 'Status has been updated successfully';
    response.successNotifyType = 'notify';
    res.status(200).json(response);
  },//End function

  UpdateDefaultStatus: async (req, res) => {
    let response = {};
    //@ Set all status as false
    response = await DBServices.RowQuery(db.sequelize, `UPDATE packages SET is_default = 0`);
    if (response.status && req.params.status === 'true') {
      //@ Set specific status as true
      response = await DBServices.UpdateDataById(db.packages, { id: req.params.id, is_default: true });
    }//End if condition
    //# Setting Success megs
    response.successNotify = true;
    response.successTitle = 'Success';
    response.successMsg = 'Default Status has been updated successfully';
    response.successNotifyType = 'notify';
    res.status(200).json(response);
  },//End function

  PackageDefault: async (req, res) => {
    let response = await DBServices.GetData(db.packages, {
      where: { is_default: true }
    });
    res.status(200).json(response);
  },//End function

  UpdateConnectsByPlan: async (req, res) => {
    let packageData = await DBServices.GetData(db.packages, { attributes: ['connects', 'regular_price', 'sale_price'], where: { id: req.body.package_ref_id } });
    req.body.connects_in = packageData.data.connects;
    req.body.price = packageData.data.sale_price ? packageData.data.sale_price : packageData.data.regular_price;
    let response = await DBServices.PostData(db.users_connects, req.body);
    if (response.status) {
      //@ Add connect and update total ===========================@//
      //# Get Total
      let totalConnects = await DBServices.GetData(db.users_connects_total, { attribute: ['id', 'connects'], where: { user_ref_id: req.body.user_ref_id } });
      let availableConnects = (totalConnects.data.connects + parseInt(packageData.data.connects));
      //# Update total with less 1 (or what is set in env file)
      DBServices.UpdateDataById(db.users_connects_total, { id: totalConnects.data.id, connects: availableConnects });
      response.connects = availableConnects;
      //@==========================================================@//
    }//End if condition

    //# Setting Success megs
    response.showThanksMsg = true;
    response.thankMsg = DBServices.PaymentThankMsg();
    response.successNotify = true;
    response.successTitle = 'Success';
    response.successMsg = 'Connects has been updated';
    response.successNotifyType = 'notify';
    res.status(200).json(response);
  },//End function

}//End Export