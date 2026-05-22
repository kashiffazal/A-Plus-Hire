const { TrimAllObjectValues } = require('./index');
const dayjs = require('dayjs');
let dbServices = {
  setDBError: (error, postData = []) => {
    return {
      status: false,
      data: postData,
      errorTitle: 'Database Error',
      errorMsg: error.message,
      errorNotifyType: 'notify',//message
      errorDuration: 10,
      errorType: 'db-error',
      errorNotifyIcon: 'error' //'info'
    }//End obj
  },//End function
  PaymentThankMsg: () => {
    return {
      title: 'Congratulations & Thank You',
      subTitle: 'for buying more connects',
      desc: 'Connects has been added into your accounts',
      btnLabel: 'Search your perfect co-worker'
    }
  }
};

dbServices.PostData = async (modal, postData) => {
  var res = {};
  //# If post values are not given then do nothing
  if (postData && Object.keys(postData).length > 0) {
    try {
      const data = await modal.create(postData);
      await data.save();
      res = { status: true, id: data.toJSON().id };
    } catch (error) {
      res = dbServices.setDBError(error, postData);
    }//End try
  }//End if condition 
  return res;
}//End function

dbServices.PostBulkData = async (modal, postData) => {
  var res = {};
  //# If post values are not given then do nothing
  if (postData && Object.keys(postData).length > 0) {
    try {
      let data = {};
      if (postData.length > 1) {
        data = await modal.bulkCreate(postData);//Bulk create can be done by Postman
      } else {
        data = await modal.create(postData);
        await data.save();
        data = data.toJSON();
      }//End if condition
      res = { status: true, id: data };
    } catch (error) {
      res = dbServices.setDBError(error, postData);
    }//End try
  }//End if condition 
  return res;
}//End function

dbServices.UpdateDataById = async (modal, updateData) => {
  var res = {};
  //# If updatable values are not given then do nothing
  if (updateData && Object.keys(updateData).length > 0 && updateData.id) {
    updateData = TrimAllObjectValues(updateData);
    try {
      await modal.update(updateData, { where: { id: updateData.id } });
      res = { status: true, id: updateData.id };
    } catch (error) {
      res = dbServices.setDBError(error, updateData);
    }//End try
  }//End if condition 
  return res;
}//End function

dbServices.PostOrUpdate = async (modal, postData) => {
  let res = {};
  if (postData.id) {
    res = dbServices.UpdateDataById(modal, postData);
  } else {
    res = dbServices.PostData(modal, postData);
  }//End if condition
  return res;
}//End function

dbServices.RowQuery = async (sequelize, query) => {
  var res = {};
  //# If updatable values are not given then do nothing
  try {
    const data = await sequelize.query(query);
    res = { status: true, data };
  } catch (error) {
    res = dbServices.setDBError(error);
  }//End try
  return res;
}//End function

dbServices.GetDataList = async (modal, params = {}) => {
  var res = {};
  try {
    const data = await modal.findAll(params);
    if (!data) {
      res = { status: false, data: [], errorTitle: 'Empty', errorMsg: 'No Data Found' };
    } else {
      //@ Adding key in list
      data.forEach((item, i) => {
        //?The dataValues property contains the actual data values of the Sequelize instance.
        item.dataValues.key = i + 1;
        if (item.dataValues.createdAt) {
          item.dataValues.createdDate = dayjs(item.dataValues.createdAt).format('DD-MM-YYYY') // '25/01/2019'
          item.dataValues.createdTime = dayjs(item.dataValues.createdAt).format('h:mm:ss A') // '25/01/2019'
        }//End if condition
        if (item.dataValues.updatedAt) {
          item.dataValues.updatedDate = dayjs(item.dataValues.createdAt).format('DD-MM-YYYY') // '25/01/2019'
          item.dataValues.updatedTime = dayjs(item.dataValues.createdAt).format('h:mm:ss A') // '25/01/2019'
        }//End if condition

      });
      res = { status: true, data: (params.order ? data : data.reverse()) };
    }//End if condition
  } catch (error) {
    res = dbServices.setDBError(error);
  }//End try
  return res;
}//End function

dbServices.GetDataListAndCountAll = async (modal, params = {}) => {
  var res = {};
  try {
    const { count, rows } = await modal.findAndCountAll(params);
    // console.log(rows);
    if (!rows) {
      res = { status: false, data: [], errorTitle: 'Empty', errorMsg: 'No Data Found' };
    } else {
      //@ Adding key in list
      rows.forEach((item, i) => {
        //?The dataValues property contains the actual data values of the Sequelize instance.
        item.dataValues.key = i + 1;
        if (item.dataValues.createdAt) {
          item.dataValues.createdDate = dayjs(item.dataValues.createdAt).format('DD-MM-YYYY') // '25/01/2019'
          item.dataValues.createdTime = dayjs(item.dataValues.createdAt).format('h:mm:ss A') // '25/01/2019'
        }//End if condition
        if (item.dataValues.updatedAt) {
          item.dataValues.updatedDate = dayjs(item.dataValues.createdAt).format('DD-MM-YYYY') // '25/01/2019'
          item.dataValues.updatedTime = dayjs(item.dataValues.createdAt).format('h:mm:ss A') // '25/01/2019'
        }//End if condition

      });
      res = { status: true, data: (params.order ? rows : rows.reverse()), count };
    }//End if condition
  } catch (error) {
    res = dbServices.setDBError(error);
  }//End try
  return res;
}//End function


dbServices.GetData = async (modal, params = {}) => {
  var res = {};
  try {
    let data = await modal.findOne(params);
    if (!data) {
      res = { status: false, data: [], errorTitle: 'Empty', errorMsg: 'No Data Found' };
    } else {
      data = data.toJSON();
      if (data.createdAt) {
        data.createdDate = dayjs(data.createdAt).format('DD-MM-YYYY') // '25/01/2019'
        data.createdTime = dayjs(data.createdAt).format('h:mm:ss A') // '25/01/2019'
      }//End if condition
      if (data.updatedAt) {
        data.updatedDate = dayjs(data.createdAt).format('DD-MM-YYYY') // '25/01/2019'
        data.updatedTime = dayjs(data.createdAt).format('h:mm:ss A') // '25/01/2019'
      }//End if condition
      res = { status: true, data };
    }//End if condition
  } catch (error) {
    res = dbServices.setDBError(error);
  }//End try
  return res;
}//End function

dbServices.CheckWithPostData = async (modal, postData, params = {}) => {
  var res = {};
  //# If post values are not given then do nothing
  if (postData && Object.keys(postData).length > 0) {
    try {
      const data = await modal.findOne(params);
      if (!data) {
        res = { status: false, data: [], errorTitle: 'No Match', errorMsg: 'Data not found' };
      } else {
        let dt = data.toJSON();
        if (dt.createdAt) {
          dt.createdDate = dayjs(dt.createdAt).format('DD-MM-YYYY') // '25/01/2019'
          dt.createdTime = dayjs(dt.createdAt).format('h:mm:ss A') // '25/01/2019'
        }//End if condition
        if (dt.updatedAt) {
          dt.updatedDate = dayjs(dt.createdAt).format('DD-MM-YYYY') // '25/01/2019'
          dt.updatedTime = dayjs(dt.createdAt).format('h:mm:ss A') // '25/01/2019'
        }//End if condition
        res = { status: true, data: dt };
      }//End if condition
    } catch (error) {
      res = dbServices.setDBError(error, postData);
    }//End try
  }//End if condition
  return res;
}//End function

// $response['status'] = true;
// $response['successTitle'] = 'Success';
// $response['successMsg'] = 'Login successful';
// $response['successNotify'] = true;
// $response['successNotifyType'] = 'message';
// $response['successDuration'] = SUCCESS_DURATION;
// $response['data'] = $data;

module.exports = dbServices;