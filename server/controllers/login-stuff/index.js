const db = require('../../models');
const DBServices = require('../../services/db-services');
const { SetUserTypeAsName, GenerateRandomCode, SendEmail, EmailTemplate } = require('../../services');
const jwt = require('jsonwebtoken');
// require('dotenv').config();


const Login = async (req, res) => {
  //@ Checking is given username and password are correct or not
  let response = await DBServices.CheckWithPostData(db.users, req.body, {
    attributes: process.env.DATA_IN_TOKEN.split(','),
    where: { username: req.body.username, password: req.body.password },
    include: { model: db.list_states, as: 'stateData', attributes: ['id', 'name'] }
  });
  // console.log(response.data);
  if (response.status) {
    if (response.data.status === 'In Active') {
      response.status = false;
      response.errorTitle = 'In Active';
      response.errorMsg = 'Account has been In Active by management';
    } else {
      let typeNotAdminSWCheck = (response.data.type !== 'ua' && response.data.type !== 'sw');

      //@Checking if payment is not made and plan is not free then ask for payment 
      if (typeNotAdminSWCheck && !response.data.package_free && !response.data.payment_done ) {
        let packageData = await DBServices.GetData(db.packages, { attributes: ['is_free_plan'], where: { user_ref_id: response.data.package_ref_id } });
        if (!packageData.data.is_free_plan) {
          response.data.ask_payment = true;
        }//End if condition
      }//End if condition

      //# If all is ok to login then get total connects for this user
      //# But Total connects is not for Admin and SW
      response.data.connects = 0;
      if (typeNotAdminSWCheck) {
        let connects = await DBServices.GetData(db.users_connects_total, { attributes: ['connects'], where: { user_ref_id: response.data.id } });
        response.data.connects = connects.data.connects;
      }//En dif condition

      response.data = SetUserTypeAsName(response.data);
      //# Setting JWT Token
      response.data.token = jwt.sign(response.data, process.env.TOKEN_SECRET_KEY);
    }//End if condition
  } else {
    if (response.errorType !== 'db-error') {
      response.errorTitle = 'Invalid Input';
      response.errorMsg = 'Please type the correct username or password';
    }//End if condition
  }//End if condition
  res.status(200).json(response);
}//End function

const ForgotPasswordSendEmail = async (req, res) => {
  //# Checking -  Is email exists in db or not
  var response = await DBServices.CheckWithPostData(db.users, req.body, {
    where: { email: req.body.email },
    attributes: ['id', 'first_name', 'last_name']
  });
  let userId = response.data.id;
  //# If it's exists then update code in db and send email to user
  if (response.status && userId) {
    let data = response.data;
    let forgot_pass_code = GenerateRandomCode()
    //@ Updating code in db
    response = await DBServices.UpdateDataById(db.users, { id: data.id, forgot_pass_code });
    //# If update is success then shoot email
    if (response.status) {
      //@ Send Email
      response = await SendEmail({
        to: `${data.first_name} ${data.last_name} <${req.body.email}>`,
        subject: 'Forget password',
        html: EmailTemplate('Forgot your password?', 'Few Step Reset your password', `
          <p>Hello ${data.first_name} ${data.last_name},</p>
          <p>Just use the code below to reset your password.</p>
          <p style="font-weight: bold;color: #5cc200;margin-top: 10px;display: block;text-align: center;">
            <span style="font-size: 24px;display: block;border: 1px dashed #${process.env.PRIMARY_COLOR};background: #f5f5f5;border-radius: 7px;padding: 3px 0px;">${forgot_pass_code}</span>
          </p>
        `)
      });
    }//End if condition
  } else {
    response.errorMsg = 'Email is not registered';
    response.errorNotifyType = 'message';
  }//End if condition
  //# Setting Success megs
  response.successNotify = true;
  response.successMsg = 'Email sent successfully - Check your inbox / spam folder';
  response.successNotifyType = 'message';
  response.data.id = userId;
  res.status(200).json(response);
}//End function

const ForgotPasswordCheckCode = async (req, res) => {
  //@ Checking is given code and email are correct or not
  let response = await DBServices.CheckWithPostData(db.users, req.body, {
    attributes: ['id'],
    where: { id: req.body.id, email: req.body.email, forgot_pass_code: req.body.forgot_pass_code }
  });
  if (response.status && response.data.id) {
    DBServices.UpdateDataById(db.users, { id: response.data.id, forgot_pass_code: null });
  }//End if condition
  response.errorMsg = 'Incorrect Code';
  response.errorNotifyType = 'message';
  res.status(200).json(response);
}//End function

const ForgotPasswordReset = async (req, res) => {
  let response = await DBServices.UpdateDataById(db.users, { id: req.body.id, password: req.body.new_password });
  //# Setting Success megs
  response.successNotify = true;
  response.successTitle = 'Success';
  response.successMsg = 'Password has been reset successfully';
  response.successNotifyType = 'message';
  res.status(200).json(response);
}//End function

const VerifyToken = (req, res, next) => {
  const reqWithHeader = req.headers['authorization'];
  if ((typeof reqWithHeader !== 'undefined')) {
    // console.log(reqWithHeader);
    jwt.verify(reqWithHeader, process.env.TOKEN_SECRET_KEY, (err) => {
      if (!err) {
        let userId = jwt.decode(reqWithHeader).id;
        let userType = jwt.decode(reqWithHeader).type;
        //@ To save user id in DB on insert / update
        if (req.id) {
          req.body.updatedBy = userId;
        } else {
          req.body.createdBy = userId;
        }//End if condition 
        req.body.currentLoginUser = userId;
        req.body.currentLoginUserType = userType;
        next();
      } else {
        res.status(200).json({ status: false, errorTitle: 'Corrupted Token', errorMsg: 'Token is not valid, Please login again', tokenCorrupted: true });
      }//End if condition
    })
  } else {
    res.status(200).json({ status: false, errorTitle: 'Invalid Token', errorMsg: 'Please login', token: false });
  }//End if condition
}//End if condition

module.exports = {
  Login,
  ForgotPasswordSendEmail,
  ForgotPasswordCheckCode,
  ForgotPasswordReset,
  VerifyToken
}