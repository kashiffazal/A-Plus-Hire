// require('dotenv').config();

//# Local Credentials
const db_credentials_local = {
  db_name: 'aplus-hire',
  user: 'root',
  password: '',
  host: 'localhost',
};

 //# Live Credentials - Demo - The BPO Group Domain
// const db_credentials_live = {
//   db_name: 'thebkbbp_aplus_node',
//   user: 'thebkbbp_aplus_node_user',
//   password: 'M*l}C9rsAVOd',
//   host: 'localhost',
// };

// //# Live Credentials - For Client Hosting - Aplus
// const db_credentials_live = {
//   db_name: 'apluasbv_aplus_node',
//   user: 'apluasbv_aplus_node_user',
//   password: 'M*l}C9rsAVOd',
//   host: 'localhost',
// };

//# Live Credentials - For Client Innotech Cloud (Server and DB is uploaded at horizonstradingcorporation.com)
const db_credentials_live = {
  db_name: 'horizonitbims_aplus',
  user: 'horizonitbims_aplus_user',
  password: 'M*l}C9rsAVOd',
  host: 'localhost',
};


module.exports = {
  db_credentials: (process.env.NODE_ENV === 'production') ? db_credentials_live : db_credentials_local,
  email_credentials: {
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: `admin@innotechcloud.com`,
      pass: '54DF4&&FSsDG3'
    }//End auth
  }//End email credentials
}//End module.exports