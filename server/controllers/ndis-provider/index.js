const db = require('../../models');
const DBServices = require('../../services/db-services');
const { SetUserTypeAsName, Base64ToImage, ArrToStringForDB, StringToArrForDB } = require('../../services');
const dayjs = require('dayjs');

module.exports = {

  NDISFormData: async (req, res) => {
    let resp = { status: true };
    //@ If id is available then get data from DB ===============//
    if (req.params.id) {
      resp = await DBServices.GetData(db.ndis_provider, {
        where: { id: req.params.id },
        attributes: { exclude: ['status', 'createdAt', 'updatedAt'] },
        include: [{ model: db.users, as: 'userData', attributes: ['profile_image', 'company_logo'] }]
      });
      resp.data.profile_image = resp.data.userData.profile_image;
      resp.data.company_logo = resp.data.userData.company_logo;
      //@ Convert Comma Separated string into Array
      if (resp.data['services_you_provide']) { resp.data['services_you_provide'] = StringToArrForDB(resp.data['services_you_provide'], true); };
    }//End if condition
    //@ ========================================================// 
    var listData = await DBServices.GetDataList(db.list_dropdown, {
      attributes: [['id', 'value'], ['name', 'label']],
      where: { type: 'ndis-services' }
    });
    resp.list = { services: listData.data.reverse() }//End obj
    res.status(200).json(resp);
  },//End function

  NDISFormPost: async (req, res) => {
    let dt = req.body;
    //@ Convert Array into comma separated string
    let arrToString = ['services_you_provide'];
    arrToString.forEach(item => {
      if (typeof dt[item] === 'object') { dt[item] = ArrToStringForDB(dt[item]); }
    });
    //@ If it's not i edit mode then set status (means first time)
    if (!dt.id) { dt.status = 'active'; }

    //@ Setting Profile Image Variable=========//
    var profile_image = dt.profile_image;
    delete dt.profile_image;
    //@========================================//
    //@ Setting Profile Image Variable=========//
    var company_logo = dt.company_logo;
    delete dt.company_logo;
    //@========================================//
    // console.log(company_logo);
    //# Post Data
    let response = await DBServices.PostOrUpdate(db.ndis_provider, dt);
    //# Some steps after insert or update
    if (response.status) {
      //# Update status for complete form in user table
      await DBServices.UpdateDataById(db.users, { 'id': dt.user_ref_id, ndis_ref_id: response.id, complete_by_type: true });
      //# Save profile image into folder if available
      if (profile_image && response.id) {
        var fileNamePI = await Base64ToImage(profile_image, dt.user_ref_id + '-sm-img.png', process.env.PROFILE_IMG_PATH);
        if (fileNamePI.status) {
          response.update_image_status = await DBServices.PostOrUpdate(db.users, { id: dt.user_ref_id, profile_image: fileNamePI.fileName });
          dt.profile_image = fileNamePI.fileName;//@ For Update 
        }//End if condition
      }//End if condition
      //# Save company logo image into folder if available
      if (company_logo && response.id) {
        var fileNameCL = await Base64ToImage(company_logo, dt.user_ref_id + '-logo-img.png', process.env.LOGO_IMG_PATH);
        if (fileNameCL.status) {
          response.update_logo_status = await DBServices.PostOrUpdate(db.users, { id: dt.user_ref_id, company_logo: fileNameCL.fileName });
          dt.company_logo = fileNameCL.fileName;//@ For Update 
        }//End if condition
      }//End if condition
    }//End if condition
    //# Setting Success megs on update
    if (dt.id) {
      response.successNotify = true;
      response.successTitle = 'Success';
      response.successMsg = `User has been updated successfully`;
      response.successNotifyType = 'message';
    }//End if condition
    response.data = dt;//@ Important to update on front-end log
    res.status(200).json(response);
  },//End function

  NDISList: async (req, res) => {
    let response = await DBServices.GetDataList(db.users, {
      attributes: ['id', 'first_name', 'last_name', 'email', 'mobile_number', 'profile_image', 'suburb', 'state', 'type', 'ndis_ref_id', 'status', 'complete_by_type'],
      where: { type: 'ndis' },
      include: [
        { model: db.list_states, as: 'stateData', attributes: ['name', 'short_name'] },
        { model: db.ndis_provider, as: 'ndisData', attributes: ['company_name'] },
      ]
    });
    // console.log(response);
    response.data = SetUserTypeAsName(response.data, [
      { objName: 'stateData', colName: 'name', labelName: 'state' },
      { objName: 'ndisData', colName: 'company_name', labelName: 'company_name', 'newVar' : true }
    ]);
    res.status(200).json(response);
  },//End function

  NDISViewDetails: async (req, res) => {
    let response = await DBServices.GetData(db.ndis_provider, {
      where: { id: req.params.id },
      include: [{
        model: db.users, as: 'userData',
        include: [
          { model: db.list_states, as: 'stateData', attributes: ['name'] },
          { model: db.list_countries, as: 'countryToBornData', attributes: ['name'] },
          { model: db.list_hear_about, as: 'hearAboutUsData', attributes: ['name'] },
          { model: db.packages, as: 'packageData', attributes: ['name'] },
        ]
      }]
    });

    if (response.status) {
      //@ Getting Services from Dropdown DB Table
      if (response.data.services_you_provide) {
        let dropdown = await DBServices.GetDataList(db.list_dropdown, {
          attributes: ['id', 'name'],
          where: { id: StringToArrForDB(response.data.services_you_provide) }
        });
        response.data.services_you_provide = dropdown.data.reverse();
      }//End if condition
      response.data.userData = SetUserTypeAsName(response.data.userData);
      //@ Setting inner join variables
      let ud = response.data.userData;
      response.data.userData.state = ud.stateData.name;
      response.data.userData.country_to_born = ud.countryToBornData.name;
      response.data.userData.hear_about_us = ud.hearAboutUsData.name;
      response.data.userData.package_name = (ud.packageData && ud.packageData.name) ? ud.packageData.name : '';
      //@ Setting dates
      response.data.userData.age = dayjs().diff(dayjs(response.data.userData.date_of_birth), 'year');
      response.data.userData.date_of_birth = dayjs(response.data.userData.date_of_birth).format('DD-MM-YYYY') // '25/01/2019'
    }//End if condition
    // console.log(response);
    res.status(200).json(response);
  },//End function

  UpdateStatus: async (req, res) => {
    let response = await DBServices.UpdateDataById(db.users, { id: req.params.id, status: req.params.status });
    //# Setting Success megs
    response.successNotify = true;
    response.successTitle = 'Success';
    response.successMsg = 'Status has been updated successfully';
    response.successNotifyType = 'notify';
    res.status(200).json(response);
  },//End function

}//End Export