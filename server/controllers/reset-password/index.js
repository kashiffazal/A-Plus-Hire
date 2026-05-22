const db = require('../../models');
const DBServices = require('../../services/db-services');
module.exports = {

  Reset: async (req, res) => {
    var response = {};
    let dt = req.body;
    let checkPassword = await DBServices.CheckWithPostData(db.users, req.body, {
      where: { id: dt.id, password: dt.current_password }
    });
    if (checkPassword.status) {
      response = await DBServices.UpdateDataById(db.users, { id: dt.id, password: dt.new_password });
      //# Setting Success megs
      response.successNotify = true;
      response.successTitle = 'Success';
      response.successMsg = 'Your password has been reset successfully';
      response.successNotifyType = 'notify';
    } else {
      //# If password did not match
      response.errorTitle = 'Incorrect password';
      response.errorMsg = 'Password did not match';
    }//End if condition
    res.status(200).json(response);
  },//End function

}//End Export