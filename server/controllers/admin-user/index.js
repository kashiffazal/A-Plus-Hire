const db = require('../../models');
const DBServices = require('../../services/db-services');
const { Op } = require("sequelize");
const { SplitName, Base64ToImage, SetUserTypeAsName } = require('../../services');
module.exports = {

  AdminUserFormPost: async (req, res) => {
    let response = '';
    let dt = req.body;
    dt.type = 'ua';
    //@ Checking if Username or Email already exists =====================//
    //? Creating Where condition=====================//
    let whereCon = { [Op.and]: [{ type: dt.type }] }//(type = 'ua') AND
    if (dt.username) {
      whereCon[Op.or] = [{ username: dt.username }, { email: dt.email }];//(username = username OR email = email) 
    } else {
      whereCon[Op.and] = [{ email: dt.email }];//(email = email) AND
    }//End if condition
    if (dt.id) { whereCon['id'] = { [Op.ne]: dt.id } }//if there is ID then (id != id)
    //? ==============================================//
    let checkUsername = await DBServices.CheckWithPostData(db.users, dt, {
      attributes: ['id', 'username', 'email'],
      where: whereCon
    });
    // console.log(checkUsername);
    // console.log(dt);
    if (checkUsername.status) {
      let emailDuplicate = (req.body.email === checkUsername.data.email) ? true : false;
      let usernameDuplicate = (req.body.username === checkUsername.data.username) ? true : false;
      let errorLabel = (emailDuplicate ? 'Email' : (usernameDuplicate ? 'Username' : ''));
      res.status(200).json({
        status: false,
        data: [],
        errorTitle: errorLabel + ' is not available',
        errorMsg: 'Please use different ' + errorLabel.toLowerCase() + '.',
        errorNotifyIcon: 'info',
      });
      return false;
    }//End if condition
    //@=============================================================//
    let name = SplitName(dt.full_name);
    dt.first_name = name.first_name;
    dt.last_name = name.last_name;
    dt.slug_color = '#5a933f';

    //@ Setting Profile Image Variable=========//
    var profile_image = dt.profile_image;
    delete dt.profile_image;
    //@========================================//

    response = await DBServices.PostOrUpdate(db.users, dt);
    // console.log(response);
    //@ If data is submitted / updated successfully then save image into folder
    if (response.status && profile_image && response.id) {
      var fileName = await Base64ToImage(profile_image, response.id + '-p-img.png', process.env.PROFILE_IMG_PATH);
      if (fileName.status) {
        response.update_image_status = await DBServices.PostOrUpdate(db.users, { id: response.id, profile_image: fileName.fileName });
        dt.profile_image = fileName.fileName;//@ For Update 
      }//End if condition
    }//End if condition

    //# Setting Success megs
    response.successNotify = true;
    response.successTitle = 'Success';
    response.successMsg = `User has been ${dt.id ? 'updated' : 'created'} successfully`;
    response.successNotifyType = 'message';
    response.data = dt;//@ Important to update on front-end context api
    res.status(200).json(response);
  },//End function

  AdminUserGetData: async (req, res) => {
    let response = await DBServices.GetData(db.users, {
      where: { id: req.params.id }
    });
    response.data.full_name = response.data.first_name;
    if (response.data.last_name) { response.data.full_name = response.data.first_name + ' ' + response.data.last_name; }
    res.status(200).json(response);
  },//End function

  AdminUserList: async (req, res) => {
    let response = await DBServices.GetDataList(db.users, {
      where: {
        type: 'ua',
        id: { [Op.ne]: req.body.currentLoginUser }//@ Remove login user from list
      }
    });
    if (response.status) {
      response.data = SetUserTypeAsName(response.data);
    }//End if condition
    res.status(200).json(response);
  },//End function

  AdminRecentUsers: async (req, res) => {
    let response = await DBServices.GetDataList(db.users, {
      where: {
        type: 'ua',
        id: { [Op.ne]: req.body.currentLoginUser }//@ Remove login user from list
      },
      limit: 5,
      order: [['id', 'DESC']]
    });
    if (response.status) {
      response.data = SetUserTypeAsName(response.data);
    }//End if condition
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