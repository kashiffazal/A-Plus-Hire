const { Op } = require("sequelize");
const db = require('../../models');
const DBServices = require('../../services/db-services');
const { MultiFieldSeparate, GenerateTimeList, Base64ToImage, SetUserTypeAsName, StringToArrForDB, ArrToStringForDB, GetTotalHourFromAvailability, SendEmail, EmailTemplate } = require('../../services');
const dayjs = require('dayjs');

module.exports = {

  SWFormData: async (req, res) => {
    let resp = { status: true };

    //@ If id is available then get data from DB ===============//
    if (req.params.id) {
      resp = await DBServices.GetData(db.support_worker, {
        where: { id: req.params.id },
        attributes: { exclude: ['status', 'createdAt', 'updatedAt'] },
        include: [{ model: db.users, as: 'userData', attributes: ['profile_image'] }]
      });
      resp.data.days_availability = resp.data.days_availability ? JSON.parse(resp.data.days_availability) : resp.data.days_availability;
      resp.data.work_experience = resp.data.work_experience ? JSON.parse(resp.data.work_experience) : resp.data.work_experience;
      resp.data.profile_image = resp.data.userData.profile_image;
      //@ Convert Comma Separated string into Array
      let arrToString = ['other_language', 'willing_to_provide', 'further_experience']
      arrToString.forEach(item => { if (resp.data[item]) { resp.data[item] = StringToArrForDB(resp.data[item], true); } });
    }//End if condition
    //@ ========================================================// 

    var responseLanguage = await DBServices.GetDataList(db.list_languages, { attributes: [['id', 'value'], ['name', 'label']] });
    var responseIndustry = await DBServices.GetDataList(db.list_industries, { attributes: [['id', 'value'], ['name', 'label']] });
    var listData = await DBServices.GetDataList(db.list_dropdown, {
      attributes: [['id', 'value'], ['name', 'label'], 'type'],
      where: {
        [Op.or]: [
          { type: 'work-status' },
          { type: 'availability' },
          { type: 'service-willing-to-provide' },
          { type: 'experience-years' },
          { type: 'experience-in-fields' },
          { type: 'km-to-travel' },
        ]
      }
    });
    // console.log(listData.data);
    resp.list = {
      languagesList: responseLanguage.data.reverse(),
      industryList: responseIndustry.data.reverse(),
      timeList: GenerateTimeList(),
      //Dropdown list from db - Filter by type
      workStatus: listData.data.filter(result => result.type === 'work-status').reverse(),
      availability: listData.data.filter(result => result.type === 'availability').reverse(),
      serviceToProvide: listData.data.filter(result => result.type === 'service-willing-to-provide').reverse(),
      expYears: listData.data.filter(result => result.type === 'experience-years').reverse(),
      expInFields: listData.data.filter(result => result.type === 'experience-in-fields').reverse(),
      kmToTravel: listData.data.filter(result => result.type === 'km-to-travel').reverse(),
    }//End obj
    res.status(200).json(resp);
  },//End function

  SWFormPost: async (req, res) => {
    let dt = req.body;
    // console.log(dt);
    //@ Convert Array into comma separated string
    let arrToString = ['other_language', 'willing_to_provide', 'further_experience']
    arrToString.forEach(item => {
      if (typeof dt[item] === 'object') { dt[item] = ArrToStringForDB(dt[item]); }
    });
    //@ If Availability is available then separate then
    if (dt.days_availability && dt.days_availability.from) {
      let availability = MultiFieldSeparate(dt.days_availability);
      dt.days_availability_from = availability.from;
      dt.days_availability_to = availability.to;
      dt.days_availability_na = availability.na;
      //@ Getting Total Hour range from Availability and set ref id for dropdown type 'availability' 
      let hourRangeList = await DBServices.GetDataList(db.list_dropdown, { where: { type: 'availability' } });
      dt.availability_hour_range_dr_ref_id = GetTotalHourFromAvailability(dt.days_availability, hourRangeList.data.reverse());
    }//End if condition
    //@ If Work Experience is available then separate then
    if (dt.work_experience && dt.work_experience.job_title) {
      let experience = MultiFieldSeparate(dt.work_experience);
      dt.work_experience_job_title = experience.job_title;
      dt.work_experience_company_name = experience.company_name;
      dt.work_experience_industry = experience.industry;
      dt.work_experience_job_role = experience.job_role;
      dt.work_experience_still_working = experience.still_working;
      dt.work_experience_start_date = experience.start_date;
      dt.work_experience_end_date = experience.end_date;
    }//End if condition
    //@ If it's not i edit mode then set status (means first time)
    if (!dt.id) { dt.status = 'Active'; }

    //@ Setting Profile Image Variable=========//
    var profile_image = dt.profile_image;
    delete dt.profile_image;
    //@========================================//

    //# Post Data
    let response = await DBServices.PostOrUpdate(db.support_worker, dt);
    //# Some steps after insert or update
    if (response.status) {
      //# Update status for complete form in user table
      DBServices.UpdateDataById(db.users, { 'id': dt.user_ref_id, sw_ref_id: response.id, complete_by_type: true });
      //# Save image into folder if available
      if (profile_image && response.id) {
        var fileName = await Base64ToImage(profile_image, dt.user_ref_id + '-sw-img.png', process.env.PROFILE_IMG_PATH);
        if (fileName.status) {
          response.update_image_status = await DBServices.PostOrUpdate(db.users, { id: dt.user_ref_id, profile_image: fileName.fileName });
          dt.profile_image = fileName.fileName;//@ For Update 
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

  SWList: async (req, res) => {
    let response = await DBServices.GetDataList(db.users, {
      attributes: ['id', 'first_name', 'last_name', 'email', 'mobile_number', 'profile_image', 'suburb', 'state', 'type', 'sw_ref_id', 'status', 'complete_by_type'],
      where: { type: 'sw' },
      include: [
        { model: db.list_states, as: 'stateData', attributes: ['name', 'short_name'] },
      ]
    });
    response.data = SetUserTypeAsName(response.data, [
      { objName: 'stateData', colName: 'name', labelName: 'state' }
    ]);
    res.status(200).json(response);
  },//End function

  SWListForNotAdmin: async (req, res) => {
    let response = await DBServices.GetDataList(db.users, {
      attributes: ['id', 'first_name', 'last_name', 'profile_image', 'date_of_birth', 'suburb', 'post_code', 'sw_ref_id'],
      where: { type: 'sw', complete_by_type: true, status: 'Active' },
      include: [
        { model: db.support_worker, as: 'swData', attributes: ['gender'] },
      ]
    });
    response.data = SetUserTypeAsName(response.data, [
      { objName: 'swData', colName: 'gender', labelName: 'gender', newVar : true }
    ]);
    res.status(200).json(response);
  },//End function

  SWViewDetails: async (req, res) => {
    let response = await DBServices.GetData(db.support_worker, {
      where: { id: req.params.id },
      include: [{
        model: db.users, as: 'userData',
        include: [
          { model: db.list_states, as: 'stateData', attributes: ['name'] },
          { model: db.list_countries, as: 'countryToBornData', attributes: ['name'] },
          { model: db.list_hear_about, as: 'hearAboutUsData', attributes: ['name'] },
          { model: db.packages, as: 'packageData', attributes: ['name'] },
          { model: db.sw_message, as: 'messageData', attributes: ['id', 'updatedAt'], required: false, limit: 1, where: { pr_user_ref_id: req.body.currentLoginUser }, order: [['id', 'DESC']] }
        ]
      },
      { model: db.list_languages, as: 'mainLanguage', attributes: ['name'] },
      { model: db.list_dropdown, as: 'wordStatusData', attributes: ['name'] },
      { model: db.list_dropdown, as: 'availabilityData', attributes: ['name'] },
      { model: db.list_dropdown, as: 'yearsOfExpData', attributes: ['name'] },
      { model: db.list_dropdown, as: 'kmToTravelData', attributes: ['name'] },
      ]
    });

    if (response.status) {
      // console.log(response.data);
      //@ Getting Other languages
      if (response.data.other_language) {
        let lang = await DBServices.GetDataList(db.list_languages, {
          attributes: ['name'],
          where: { id: StringToArrForDB(response.data.other_language) }
        });
        response.data.other_language_name = lang.data;
      }//End if condition
      //@ Getting Industries
      if (response.data.work_experience) {
        let industry = await DBServices.GetDataList(db.list_industries, {
          attributes: ['id', 'name'],
          where: { id: StringToArrForDB(response.data.work_experience_industry) }
        });
        response.data.work_experience_industry_name = industry.data;
      }//End if condition
      //@ Getting Dropdown values from DB
      if (response.data.willing_to_provide || response.data.further_experience) {
        let dropdown = await DBServices.GetDataList(db.list_dropdown, {
          attributes: ['id', 'name', 'type'],
          where: { id: [...StringToArrForDB(response.data.willing_to_provide), ...StringToArrForDB(response.data.further_experience)] }
        });
        response.data.willing_to_provide = dropdown.data.filter(result => result.type === 'service-willing-to-provide').reverse();
        response.data.further_experience = dropdown.data.filter(result => result.type === 'experience-in-fields').reverse();
      }//End if condition
      response.data.userData = SetUserTypeAsName(response.data.userData);
      //@ Setting inner join variables
      let ud = response.data.userData;
      response.data.userData.state = ud.stateData.name;
      response.data.userData.country_to_born = ud.countryToBornData.name;
      response.data.userData.hear_about_us = ud.hearAboutUsData.name;
      response.data.userData.package_name = ud.packageData ? ud.packageData.name : '';
      response.data.main_language = response.data.mainLanguage ? response.data.mainLanguage.name : '';
      response.data.days_availability = response.data.days_availability ? JSON.parse(response.data.days_availability) : {};
      response.data.work_experience = response.data.work_experience ? JSON.parse(response.data.work_experience) : {};

      response.data.work_status = response.data.wordStatusData ? response.data.wordStatusData.name : '';
      response.data.availability = response.data.availabilityData ? response.data.availabilityData.name : '';
      response.data.years_of_experience = response.data.yearsOfExpData ? response.data.yearsOfExpData.name : '';
      response.data.km_to_travel = response.data.kmToTravelData ? response.data.kmToTravelData.name : '';

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