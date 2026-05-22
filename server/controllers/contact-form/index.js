const db = require('../../models');
const DBServices = require('../../services/db-services');

module.exports = {
  GetList: async (req, res) => {
    let response = await DBServices.GetDataList(db.web_contact_form, {
      attributes: ['id', 'name', 'phone', 'email', 'message_type', 'createdAt']
    });
    res.status(200).json(response);
  },

  GetDetails: async (req, res) => {
    let response = await DBServices.GetData(db.web_contact_form, { where: { id: req.params.id } });
    res.status(200).json(response);
  },

  // UpdateStatus: async (req, res) => {
  //   let response = await DBServices.UpdateDataById(db.web_contact_form, { id: req.params.id, status: req.params.status });
  //   //# Setting Success megs
  //   response.successNotify = true;
  //   response.successTitle = 'Success';
  //   response.successMsg = 'Status has been updated successfully';
  //   response.successNotifyType = 'notify';
  //   res.status(200).json(response);
  // },//End function

}//End Export