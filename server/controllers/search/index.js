const { Op, Sequelize } = require("sequelize");
const db = require('../../models');
const DBServices = require('../../services/db-services');
const { SetUserTypeAsName } = require('../../services');

module.exports = {

  GetFormDataWeb: async (req, res) => {
    let response = { status: true, data: {} };
    response.data.stateList = (await DBServices.GetDataList(db.list_states, { attributes: [['id', 'value'], ['name', 'label']] })).data.reverse();
    res.status(200).json(response);
  },//End function

  GetFormData: async (req, res) => {
    let response = { status: true, data: {} };
    response.data.states = (await DBServices.GetDataList(db.list_states, { attributes: [['id', 'value'], ['name', 'label']] })).data.reverse();
    response.data.languages = (await DBServices.GetDataList(db.list_languages, { attributes: [['id', 'value'], ['name', 'label']] })).data.reverse();
    response.data.gender = [{ key: 1, value: 'Male' }, { key: 2, value: 'Female' }, { key: 3, value: 'Prefer not to say' }, { key: 4, value: 'Prefer to self-describe' }];
    response.data.haveCar = [{ key: 1, value: 'Yes' }, { key: 2, value: 'No' }];
    response.data.islanderOrigin = [{ key: 1, value: 'Yes' }, { key: 2, value: 'No' }, { key: 3, value: 'Prefer not to say' }];
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
    response.data.workStatus = listData.data.filter(result => result.type === 'work-status').reverse();
    response.data.availability = listData.data.filter(result => result.type === 'availability').reverse();
    response.data.serviceToProvide = listData.data.filter(result => result.type === 'service-willing-to-provide').reverse();
    response.data.expYears = listData.data.filter(result => result.type === 'experience-years').reverse();
    response.data.expInFields = listData.data.filter(result => result.type === 'experience-in-fields').reverse();
    response.data.kmToTravel = listData.data.filter(result => result.type === 'km-to-travel').reverse();
    //@ Setting distance
    let search_distance = [];
    for (let index = 0; index < 25; index++) { search_distance.push({ label: (index + 1) + 'km', value: index + 1 }); }
    response.data.searchDistance = search_distance;
    res.status(200).json(response);
  },//End function

  GetList: async (req, res) => {
    // console.log(req.body);
    let dt = req.body;
    // console.log(dt);
    // let dt = {
    //   userCondition: {
    //     // post_code: { type: 'like', value: '121212' },
    //     // suburb: { type: 'like', value: 'Karachi' },
    //     // state: { type: 'equal', value: 6 },
    //   },
    //   swCondition: {
    //     // id: { type: 'equal', value: 3 },
    //     // gender: { type: 'equal', value: 'Male' },
    //     // is_english_main_language: { type: 'equal', value: 'Yes' },
    //     // other_language: { type: 'like-arr-or', value: ['5','4'] },
    //     // is_english_main_language : {type: 'equal', value: 'Yes'},
    //     // work_status : {type: 'equal', value: 2},
    //     // availability_hour_range_dr_ref_id: { type: 'equal', value: 6 },
    //     // willing_to_provide: { type: 'like-arr-or', value: ['18', '13'] },
    //     // years_of_experience: { type: 'equal', value: 24 },
    //     // further_experience: { type: 'like-arr-or', value: ['44'] },
    //     // have_car: { type: 'equal', value: 'No' },
    //     // km_to_travel: { type: 'equal', value: 51 },
    //     // cultural_diversity: { type: 'equal', value: 'Yes' },
    //   }
    // };
    //@ If one of these obj are missing then set as empty
    if (!dt.userCondition) { dt.userCondition = {} }
    if (!dt.swCondition) { dt.swCondition = {} }

    //@ Set variables to use it in some conditions
    let userParamsKeys = Object.keys(dt.userCondition);
    let swParamsKeys = Object.keys(dt.swCondition);

    //@ Check if given post values are empty, if yes then remove from (userParamsKeys || swParamsKeys) //
    userParamsKeys.forEach((item, index) => { if (!dt.userCondition[item].value || dt.userCondition[item].value === '') { delete userParamsKeys[index]; delete dt.userCondition[item]; } });
    swParamsKeys.forEach((item, index) => { if (!dt.swCondition[item].value || dt.swCondition[item].value === '') { delete swParamsKeys[index]; delete dt.swCondition[item]; } });
    userParamsKeys = userParamsKeys.filter((el) => { return el != null });//REmove Empty values
    swParamsKeys = swParamsKeys.filter((el) => { return el != null });//REmove Empty values
    //@==================================================================//
    // console.log(userParamsKeys);

    //@ Check if post values are not given then return error//
    let dataNotFoundRes = { status: true, noData: true, data: {}, errorTitle: 'No Match', errorMsg: 'Data not found' };
    if (userParamsKeys.length === 0 && swParamsKeys.length === 0) { res.status(200).json(dataNotFoundRes); return false; }//End if condition
    //@=====================================================//

    //@ User where conditions (some Mandatory conditions)
    let userWhere = { type: 'sw', complete_by_type: true, status: 'Active' };
    Object.keys(dt.userCondition).forEach(item => {
      if (dt.userCondition[item].type === 'equal') { userWhere[item] = dt.userCondition[item].value; }//End if condition
      if (dt.userCondition[item].type === 'like') { userWhere[item] = { [Op.substring]: dt.userCondition[item].value }; }//End if condition
    })

    //@ Filter Radius
    if (userWhere.search_distance) {
      if (req.body.currentLoginUserType === 'ua') {
        res.status(200).json({ status: true, noData: true, data: {}, errorTitle: 'Radius Filter', errorMsg: 'Not available for admin user because admin has not address to compare with', duration: 5 });
        return;
      }//End if condition
      //? Getting researcher lat and lng from DB
      let researcherData = await DBServices.GetData(db.users, { attributes: ['latitude', 'longitude'], where: { id: req.body.currentLoginUser } });
      researcherData = researcherData.data;
      //? Define the Researcher Location and Radius
      const adminLatitude = researcherData.latitude;
      const adminLongitude = researcherData.longitude;
      const radiusInKilometers = userWhere.search_distance;
      //? Delete from where object because it has a different condition
      delete userWhere.search_distance;
      userWhere[Op.and] = Sequelize.where(
        Sequelize.fn(
          'ST_Distance_Sphere',
          Sequelize.fn('POINT', adminLongitude, adminLatitude),
          Sequelize.fn('POINT', Sequelize.col('longitude'), Sequelize.col('latitude'))
        ),
        '<=',
        (radiusInKilometers * 1000) //? Convert radius to meters
      )//End condition
    }//End if condition

    // console.log(userWhere)
    //@ SW where conditions
    let swWhere = {};
    Object.keys(dt.swCondition).forEach(item => {
      if (dt.swCondition[item].type === 'equal') { swWhere[item] = dt.swCondition[item].value; }//End if condition
      if (dt.swCondition[item].type === 'like-arr-or') {
        if (!swWhere[item]) { swWhere[item] = {}; }
        if (!swWhere[item][Op.or]) { swWhere[item][Op.or] = []; }
        // swWhere[Op.and].push([item]);
        dt.swCondition[item].value.forEach(it => {
          swWhere[item][Op.or].push({ [Op.substring]: `(%)${it}(%)` });// LIKE '%hat%'
        })
      }
    });
    // console.log(swWhere)
    // console.log(dt);
    let response = await DBServices.GetDataListAndCountAll(db.users, {
      attributes: ['id', 'first_name', 'last_name', 'street_address', 'suburb', 'post_code', 'state', 'profile_image'],
      where: userWhere,
      include: [{
        model: db.support_worker, as: 'swData', attributes: ['id', 'about_you'],
        where: swWhere
      }, {
        model: db.list_states, as: 'stateData', attributes: ['name']
      }, {
        model: db.sw_message, as: 'messageData', attributes: ['id', 'updatedAt'], required: false, limit: 1, where: { pr_user_ref_id: (req.body.currentLoginUser ? req.body.currentLoginUser : '') }, order: [['id', 'DESC']]
      }],
      order: [['id']],
      offset: dt.pagination.offset,
      limit: dt.pagination.limit,
    });
    response.data = SetUserTypeAsName(response.data, [
      { objName: 'stateData', colName: 'name', labelName: 'state' }
    ]);
    //@ Id data not found then set dataNotFoundRes
    if (response.status && response.data.length === 0) { response = dataNotFoundRes; }//End if condition
    res.status(200).json(response);
  },//End function
}//End Export