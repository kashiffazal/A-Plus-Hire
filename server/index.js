//@ Require All Modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// require('dotenv').config();
// const Services = require('./services');
const dotenv = require('dotenv');
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config({ path: '.env.development' });
}//End if condition

//@ Importing API stuff
require('./models');//Creating DB Tables with 'sequelize'
// const List = require('./controllers/list-creation');
const Website = require('./controllers/website');
const Registration = require('./controllers/registration');
const LoginStuff = require('./controllers/login-stuff');
const SW = require('./controllers/support-worker');
const NDIS = require('./controllers/ndis-provider');
const SM = require('./controllers/self-managed-participant');
const Dashboard = require('./controllers/dashboard');
const Packages = require('./controllers/packages');
const AdminUser = require('./controllers/admin-user');
const ResetPassword = require('./controllers/reset-password');
const SearchSW = require('./controllers/search');
const ContactForm = require('./controllers/contact-form');
const Profile = require('./controllers/profile');
const MSG = require('./controllers/messages');
const Payment = require('./controllers/payments');
const TEST = require('./controllers/test');
// const { parsePath } = require('react-router-dom');



const app = express();
const PORT = process.env.PORT || 8080;

var corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://aplus-create-react-app.vercel.app',
    'https://aplus.innotechcloud.com',
    'https://aplushire.com.au'
  ], credentials: true,
}//End object

//# Middleware
const maxPostLimit = '5mb';
app.use(cors(corsOptions));//@ Cross Origin Request / Url
app.use(bodyParser.json({ limit: maxPostLimit }));//@ All get and Post data will be in JSON format
app.use(bodyParser.urlencoded({ extended: true, limit: maxPostLimit }));

//# API Routes
app.get('/', async (req, res) => {
  res.send(`Hi, Server is running at ${PORT}`);
});

//@ Adding Lists data at one time
// app.post('/addBulkCountries', List.AddBulkCountries);
// app.post('/addBulkAustStates', List.AddBulkAustState);
// app.post('/addBulkLanguages', List.AddBulkLanguages);
// app.post('/addBulkHearAbout', List.AddBulkHearAboutUs);
// app.post('/addBulkIndustries', List.AddIndustries);
// app.post('/addBulkDropdown', List.AddDropdown);
//@ SW dummy data - 1000 records
// app.get('/addBulkSW1000', List.AddSW1000);


//@ Function to serve all static files
app.use('/profile_images', express.static('files/uploads/profile_images'));
app.use('/company_logo', express.static('files/uploads/company_logo'));

app.post('/webFormSendEmail', Website.ContactFormSend);

app.get('/registrationFormData', Registration.RegistrationFormData)
app.post('/registration', Registration.RegistrationPost);
app.post('/verification', Registration.RegistrationVerification);
app.get('/resendVerificationEmail/:id', Registration.RegistrationVerificationResendEmail);
app.get('/resendVerificationSMS/:id', Registration.RegistrationVerificationResendSMS);
app.post('/login', LoginStuff.Login);
app.post('/sendEmailForForgotPassword', LoginStuff.ForgotPasswordSendEmail);
app.post('/checkForgotPassCode', LoginStuff.ForgotPasswordCheckCode);
app.post('/resetPasswordByForgot', LoginStuff.ForgotPasswordReset);

app.get('/swFormData', LoginStuff.VerifyToken, SW.SWFormData);
app.get('/swFormData/:id', LoginStuff.VerifyToken, SW.SWFormData);
app.post('/swForm', LoginStuff.VerifyToken, SW.SWFormPost);
app.get('/swList', LoginStuff.VerifyToken, SW.SWList);
app.get('/swListForNotAdmin', LoginStuff.VerifyToken, SW.SWListForNotAdmin);
app.get('/swViewDetails/:id', LoginStuff.VerifyToken, SW.SWViewDetails);
app.get('/swUpdateStatus/:id/:status', LoginStuff.VerifyToken, SW.UpdateStatus);

app.post('/sendMessageToSW', LoginStuff.VerifyToken, MSG.SendMessageToSW);
app.post('/sendMessageToProvider', LoginStuff.VerifyToken, MSG.SendMessageToProvider);
app.get('/getMessagesSW', LoginStuff.VerifyToken, MSG.GetMsgListSW);
app.get('/getMessagesProvider', LoginStuff.VerifyToken, MSG.GetMsgListProvider);

app.get('/ndisFormData', LoginStuff.VerifyToken, NDIS.NDISFormData);
app.get('/ndisFormData/:id', LoginStuff.VerifyToken, NDIS.NDISFormData);
app.post('/ndisForm', LoginStuff.VerifyToken, NDIS.NDISFormPost);
app.get('/ndisList', LoginStuff.VerifyToken, NDIS.NDISList);
app.get('/ndisViewDetails/:id', LoginStuff.VerifyToken, NDIS.NDISViewDetails);
app.get('/ndisUpdateStatus/:id/:status', LoginStuff.VerifyToken, NDIS.UpdateStatus);

app.get('/smFormData', LoginStuff.VerifyToken, SM.SMFormData);
app.get('/smFormData/:id', LoginStuff.VerifyToken, SM.SMFormData);
app.post('/smForm', LoginStuff.VerifyToken, SM.SMFormPost);
app.get('/smList', LoginStuff.VerifyToken, SM.SMList);
app.get('/smViewDetails/:id', LoginStuff.VerifyToken, SM.SMViewDetails);
app.get('/smUpdateStatus/:id/:status', LoginStuff.VerifyToken, SM.UpdateStatus);

app.get('/dashboard', LoginStuff.VerifyToken, Dashboard.GetUsersChartDataAndCount);

app.post('/addPackage', LoginStuff.VerifyToken, Packages.AddPackagePost);
app.get('/packageFormData/:id', LoginStuff.VerifyToken, Packages.PackageFormData);
app.get('/updatePackageStatus/:id/:status', LoginStuff.VerifyToken, Packages.UpdateStatus);
app.get('/updatePackageDefaultStatus/:id/:status', LoginStuff.VerifyToken, Packages.UpdateDefaultStatus);
app.get('/getPackageList', LoginStuff.VerifyToken, Packages.PackageList);
app.get('/packageViewDetails/:id', LoginStuff.VerifyToken, Packages.PackageViewDetails);
app.get('/packageDefault/', Packages.PackageDefault);//@ this could call without token
app.get('/getPackageListForWeb', Packages.PackageListForWeb);//@ this could call without token
app.get('/getPackageListForWeb/:isPortal', Packages.PackageListForWeb);//@ this could call without token
app.post('/updateConnectsByPlan', LoginStuff.VerifyToken, Packages.UpdateConnectsByPlan);

app.post('/adminUserForm', LoginStuff.VerifyToken, AdminUser.AdminUserFormPost);
app.get('/adminUserFormData/:id', LoginStuff.VerifyToken, AdminUser.AdminUserGetData);
app.get('/adminUserList', LoginStuff.VerifyToken, AdminUser.AdminUserList);
app.get('/adminRecentUserList', LoginStuff.VerifyToken, AdminUser.AdminRecentUsers);
app.get('/adminUserStatus/:id/:status', LoginStuff.VerifyToken, AdminUser.UpdateStatus);
app.post('/adminPasswordReset', LoginStuff.VerifyToken, ResetPassword.Reset);

app.post('/updateUserProfile', LoginStuff.VerifyToken, Profile.UpdateUserProfile);
app.get('/profileFormGetList', LoginStuff.VerifyToken, Profile.GetList);

app.get('/getSearchFormData', LoginStuff.VerifyToken, SearchSW.GetFormData);
app.get('/getSearchFormDataWeb', SearchSW.GetFormDataWeb);//@ this could call without token because this API is used in Portal and Website
app.post('/searchSW', LoginStuff.VerifyToken, SearchSW.GetList);
app.post('/searchSWWeb', SearchSW.GetList);//@ this could call without token because this API is used in Portal and Website

app.get('/getFormList', LoginStuff.VerifyToken, ContactForm.GetList);
app.get('/getFormDetails/:id', LoginStuff.VerifyToken, ContactForm.GetDetails);
// app.get('/formUpdateStatus/:id/:status', LoginStuff.VerifyToken, ContactForm.UpdateStatus);


// app.get('/getStripePublicKey', LoginStuff.VerifyToken, Payment.GetStripePublicKey);
// app.post('/paymentWithStripe',LoginStuff.VerifyToken, Payment.StripePayment);
app.post('/getStripePaymentIntents', LoginStuff.VerifyToken, Payment.GetStripePaymentIntents);
app.post('/updateFirstPaymentStatus', LoginStuff.VerifyToken, Payment.UpdateFirstPaymentStatus);

// app.get('/test',TEST.SendTestEmail);
// app.get('/test',Dashboard.GetUsersChartDataAndCount);

app.listen(PORT, () => {
  console.log(`Express Server is running on ${PORT}`)
});