const db = require('../../models');
const DBServices = require('../../services/db-services');
const { GenerateRandomCode, GenerateRandomHexColorCode, SendEmail, EmailTemplate, SetUserTypeAsName, SendSMS, GetLatitudeAndLongitudeFromAddressWithRetry } = require('../../services');
const jwt = require('jsonwebtoken');
// require('dotenv').config();

const RegistrationPost = async (req, res) => {
  let postData = req.body;

  //@ Checking if Username already exists =====================//
  let checkUsername = await DBServices.CheckWithPostData(db.users, req.body, {
    where: { username: req.body.email }
  });
  if (checkUsername.status) {
    res.status(200).json({
      status: false,
      data: [],
      errorTitle: 'Email already in use',
      errorMsg: 'Please use different email address',
      errorNotifyIcon: 'info',
    });
    return false;
  }//End if condition
  //@=============================================================//

  //@ Getting lng and lat for radius filter ==============//
  let state_name = await DBServices.GetData(db.list_states, { where: { id: postData.state } });
  let coordinate = await GetLatitudeAndLongitudeFromAddressWithRetry(postData.post_code, postData.suburb, state_name.data.name);
  if (coordinate.status) {
    postData.latitude = coordinate.data.lat;
    postData.longitude = coordinate.data.lng;
  } else {
    res.status(200).json(coordinate);
    return false;
  }//End if condition
  //@======================================================//

  //@ Getting Package Details for add connects in different tables and also check is it free ot not//
  let packageData = await DBServices.GetData(db.packages, { where: { id: postData.package_ref_id } });
  packageData = packageData.data;
  packageData.main_price = packageData.sale_price ? packageData.sale_price : packageData.regular_price;
  postData.package_free = packageData.is_free_plan ? true : false;
  //@==============================================================================================//


  //? Setting variables 
  //? Email and Username are both same until user change it
  postData.username = postData.email;
  postData.email_code = GenerateRandomCode();
  postData.mobile_code = GenerateRandomCode();
  postData.slug_color = GenerateRandomHexColorCode();
  postData.status = 'Not Verified';
  //# Post Data
  let response = await DBServices.PostData(db.users, postData);
  if (response.status) {
    //@ If type is SW and Price is 0 so it's mean this is a Free Plan, just add connects in DB
    //@ And Paid plans will be add after payment in next section of registration
    if (postData.type !== 'sw'
      // && packageData.main_price === 0
    ) {
      //# Post Connects data into DB
      response.connects_res = await DBServices.PostData(db.users_connects, { user_ref_id: response.id, package_ref_id: packageData.id, connects_in: packageData.connects, price: packageData.main_price });
      if (response.connects_res.status) {
        //# Add connect into Total Connect table
        response.total_connects_res = await DBServices.PostData(db.users_connects_total, { user_ref_id: response.id, connects: packageData.connects });
      }//En dif condition
    }//End if condition

    //@Send email and SMS
    SendEmail({
      to: `${postData.first_name} ${postData.last_name} <${postData.email}>`,
      subject: `Verify your Email to Complete Registration on ${process.env.COMPANY_NAME}`,
      html: EmailTemplate('Email Verification', 'Please verify your email address', `
        <p>Hello ${postData.first_name} ${postData.last_name},</p>
        <p>Thank you for signing up with us! To complete your registration, please verify your email address by entering the following verification code:</p>
        <p style="font-weight: bold;color: #${process.env.PRIMARY_COLOR};margin-top: 10px;display: block;text-align: center;">
          Email Code: <span style="font-size: 24px;display: block;border: 1px dashed #${process.env.PRIMARY_COLOR};background: #f5f5f5;border-radius: 7px;padding: 3px 0px;">${postData.email_code}</span>
        </p>
        <p style="font-weight: bold;color: #${process.env.PRIMARY_COLOR};margin-top: 10px;display: block;text-align: center;">
          Mobile Code: <span style="font-size: 24px;display: block;border: 1px dashed #${process.env.PRIMARY_COLOR};background: #f5f5f5;border-radius: 7px;padding: 3px 0px;">${postData.mobile_code}</span>
        </p>
        <!--p>This code will expire in 30 minutes, so make sure to verify your email as soon as possible.</p-->
        <p>If you did not sign up for an account, please ignore this email.</p>
        <p>Thank you and welcome to ${process.env.COMPANY_NAME}!</p>
      `)
    });
    // if (postData.mobile_number) {
    //   //? \D matches any non-digit character (Remove + and spaces)
    //   const mobileNumber = postData.mobile_number.replace(/\D/g, '');
    //   SendSMS({
    //     to: mobileNumber,
    //     message: `${process.env.COMPANY_NAME}: Your verification code is: ${postData.mobile_code}`
    //   });
    // }//End if condition
  }//End if condition
  res.status(200).json(response);
}//End function

const RegistrationVerificationResendEmail = async (req, res) => {
  let updateObj = {
    id: req.params.id,
    email_code: GenerateRandomCode(),
  }// update obj
  //# Update new code in DB
  var response = await DBServices.UpdateDataById(db.users, updateObj);
  if (response.status) {
    //#Get data from db for Email like name, email and new added code etc
    let data = await DBServices.GetData(db.users, {
      where: { id: req.params.id },
      attributes: ['first_name', 'last_name', 'email', 'email_code','mobile_code']
    });
    data = data.data;

    //@ Send Email
    response = await SendEmail({
      to: `${data.first_name} ${data.last_name} <${data.email}>`,
      subject: `Verify your Email to Complete Registration on ${process.env.COMPANY_NAME}`,
      html: EmailTemplate('Email Verification', 'Please verify your email address', `
        <p>Hello ${data.first_name} ${data.last_name},</p>
        <p>Thank you for signing up with us! To complete your registration, please verify your email address by entering the following verification code:</p>
        <p style="font-weight: bold;color: #${process.env.PRIMARY_COLOR};margin-top: 10px;display: block;text-align: center;">
          Email Code: <span style="font-size: 24px;display: block;border: 1px dashed #${process.env.PRIMARY_COLOR};background: #f5f5f5;border-radius: 7px;padding: 3px 0px;">${data.email_code}</span>
        </p>
        <p style="font-weight: bold;color: #${process.env.PRIMARY_COLOR};margin-top: 10px;display: block;text-align: center;">
          Mobile Code: <span style="font-size: 24px;display: block;border: 1px dashed #${process.env.PRIMARY_COLOR};background: #f5f5f5;border-radius: 7px;padding: 3px 0px;">${data.mobile_code}</span>
        </p>
        <!--p>This code will expire in 30 minutes, so make sure to verify your email as soon as possible.</p-->
        <p>If you did not sign up for an account, please ignore this email.</p>
        <p>Thank you and welcome to ${process.env.COMPANY_NAME}!</p>
      `)
    });
  }//End if condition
  //# Setting Success megs
  response.successNotify = true;
  // response.successTitle = 'Success';
  response.successMsg = 'Email sent successfully';
  response.successNotifyType = 'message';
  res.status(200).json(response);
}//End function

const RegistrationVerificationResendSMS = async (req, res) => {
  RegistrationVerificationResendEmail(req, res);
  return false;
  let updateObj = {
    id: req.params.id,
    mobile_code: GenerateRandomCode()
  }// update obj
  //# Update new code in DB
  var response = await DBServices.UpdateDataById(db.users, updateObj);
  if (response.status) {
    //#Get data from db for Email like name, email and new added code etc
    let data = await DBServices.GetData(db.users, {
      where: { id: req.params.id },
      attributes: ['first_name', 'last_name', 'mobile_number', 'mobile_code']
    });
    data = data.data;

    //@ Send SMS
    // if (data.mobile_number) {
    //? \D matches any non-digit character (Remove + and spaces)
    const mobileNumber = data.mobile_number.replace(/\D/g, '');
    response = await SendSMS({
      to: mobileNumber,
      message: `${process.env.COMPANY_NAME}: Your verification code is: ${data.mobile_code}`
    });
    // }//End if condition
  }//End if condition
  // console.log(response);
  //# Setting Success megs
  response.successNotify = true;
  // response.successTitle = 'Success';
  response.successMsg = 'SMS sent successfully';
  response.successNotifyType = 'message';
  res.status(200).json(response);
}//End function

const RegistrationVerification = async (req, res) => {
  //@ Checking is given code for email and mobile are correct or not
  let response = await DBServices.CheckWithPostData(db.users, req.body, {
    attributes: process.env.DATA_IN_TOKEN.split(','),
    where: { id: req.body.id, email_code: req.body.email_code, mobile_code: req.body.mobile_code },
    include: { model: db.list_states, as: 'stateData', attributes: ['id', 'name'] }
  });
  if (response.status) {
    //# If it's correct then update verification status for email and mobile
    let updatedData = { id: req.body.id, email_verified: true, mobile_number_verified: true, status: 'Active' }
    let updateRes = await DBServices.UpdateDataById(db.users, updatedData);
    if (updateRes.status) {

      //# Get user total connect
      response.data.connects = 0;
      if (response.data.type !== 'sw') {
        let userTotalConnect = await DBServices.GetData(db.users_connects_total, { where: { user_ref_id: req.body.id } });
        response.data.connects = userTotalConnect.data.connects;
      }//End if condition

      response.data = SetUserTypeAsName(response.data);
      //# Setting JWT Token
      response.data.token = jwt.sign(response.data, process.env.TOKEN_SECRET_KEY);
      //# Setting Success megs
      response.successNotify = true;
      response.successTitle = 'Success';
      response.successMsg = 'Account has been verified successfully';
      response.successNotifyType = 'message';
    }//End if condition
  } else {
    response.errorTitle = 'Invalid Code';
    response.errorMsg = 'Please type the verification cde correctly';
  }//End if condition
  res.status(200).json(response);
}//End function

const RegistrationFormData = async (req, res) => {
  let response = { status: true, data: {} };
  response.data.list_states = (await DBServices.GetDataList(db.list_states)).data.reverse();
  response.data.list_countries = (await DBServices.GetDataList(db.list_countries)).data.reverse();
  response.data.list_hear_about = (await DBServices.GetDataList(db.list_hear_about)).data.reverse();
  response.data.list_hear_about = [...response.data.list_hear_about, { id: 0, name: 'Other', key: (response.data.list_hear_about.length + 1) }];
  res.status(200).json(response);
}//End function

module.exports = {
  RegistrationPost,
  RegistrationVerificationResendEmail,
  RegistrationVerificationResendSMS,
  RegistrationVerification,
  RegistrationFormData,
}//End Export