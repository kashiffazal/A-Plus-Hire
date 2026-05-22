const db = require('../../models');
const DBServices = require('../../services/db-services');
const { ReadFile, Base64ToImage } = require('../../services');

module.exports = {

  AddBulkCountries: async (req, res) => {
    let response = await DBServices.PostBulkData(db.list_countries, req.body);
    //# Setting Success megs
    response.successNotify = true;
    response.successTitle = 'Success';
    response.successMsg = `Bulk countries data has been added successfully`;
    response.successNotifyType = 'notify';
    // response.data = req.body;
    res.status(200).json(response);
  },//End function

  AddBulkAustState: async (req, res) => {
    let response = await DBServices.PostBulkData(db.list_states, req.body);
    //# Setting Success megs
    response.successNotify = true;
    response.successTitle = 'Success';
    response.successMsg = `Bulk states data has been added successfully`;
    response.successNotifyType = 'notify';
    // response.data = req.body;
    res.status(200).json(response);
  },//End function

  AddBulkLanguages: async (req, res) => {
    let response = await DBServices.PostBulkData(db.list_languages, req.body);
    //# Setting Success megs
    response.successNotify = true;
    response.successTitle = 'Success';
    response.successMsg = `Bulk languages data has been added successfully`;
    response.successNotifyType = 'notify';
    // response.data = req.body;
    res.status(200).json(response);
  },//End function

  AddBulkHearAboutUs: async (req, res) => {
    let response = await DBServices.PostBulkData(db.list_hear_about, req.body);
    //# Setting Success megs
    response.successNotify = true;
    response.successTitle = 'Success';
    response.successMsg = `Bulk hear about data has been added successfully`;
    response.successNotifyType = 'notify';
    // response.data = req.body;
    res.status(200).json(response);
  },//End function

  AddIndustries: async (req, res) => {
    let response = await DBServices.PostBulkData(db.list_industries, req.body);
    //# Setting Success megs
    response.successNotify = true;
    response.successTitle = 'Success';
    response.successMsg = `Bulk industries data has been added successfully`;
    response.successNotifyType = 'notify';
    // response.data = req.body;
    res.status(200).json(response);
  },//End function

  AddDropdown: async (req, res) => {
    let response = await DBServices.PostBulkData(db.list_dropdown, req.body);
    //# Setting Success megs
    response.successNotify = true;
    response.successTitle = 'Success';
    response.successMsg = `Bulk dropdown data has been added successfully`;
    response.successNotifyType = 'notify';
    // response.data = req.body;
    res.status(200).json(response);
  },//End function

  //@ SW dummy data - 1000 records
  AddSW1000: async (req, res) => {
    const path = require('path');
    //# Getting Data from JSON file
    const filePath = path.join(__dirname, 'A-Plus-Hire-SW-Data.json');
    let data = await ReadFile(filePath);
    // console.log(data);

    //# Insert into DB
    let response = {};
    let index = 0
    for (const item of data.data) {
      //@ Separate variables
      var profileImage = item.profile_image;
      // var companyLogo = item.company_logo;
      var swData = item.swData;
      delete item.profile_image
      delete item.company_logo;
      delete item.swData;
      //@ Insert data in user table
      let dbRes = await DBServices.PostData(db.users, item);
      //@ Insert data in user connects table
      dbRes.connects_res = await DBServices.PostData(db.users_connects, { user_ref_id: dbRes.id, package_ref_id: item.package_ref_id, connects: item.package_initial_connects });
      //@ Insert data in SW table
      swData.user_ref_id = dbRes.id;
      dbRes.sw_res = await DBServices.PostData(db.support_worker, swData);
      //# Save image into folder if available
      var fileName = await Base64ToImage(profileImage, dbRes.id + '-sw-img.png', process.env.PROFILE_IMG_PATH);
      //# Update user_ref_id in user table
      dbRes.us_res = await DBServices.UpdateDataById(db.users, { 'id': dbRes.id, sw_ref_id: dbRes.sw_res.id, profile_image: fileName.fileName });
      response[index] = dbRes;
      index = index + 1;
    }//End for loop
    // response.data = data.data;
    //# Setting Success megs
    response.successNotify = true;
    response.successTitle = 'Success';
    response.successMsg = `Bulk dropdown data has been added successfully`;
    response.successNotifyType = 'notify';
    res.status(200).json(response);
  },//End function

}//End Export