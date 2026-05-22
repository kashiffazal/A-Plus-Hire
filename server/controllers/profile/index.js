const db = require('../../models');
const DBServices = require('../../services/db-services');
const { SplitName, Base64ToImage, GetLatitudeAndLongitudeFromAddressWithRetry } = require('../../services');
module.exports = {

  UpdateUserProfile: async (req, res) => {
    let response = '';
    let dt = req.body;
    let name = SplitName(dt.full_name);
    dt.first_name = name.first_name;
    dt.last_name = name.last_name;
    // console.log(dt);
    //@ Setting Profile Image Variable=========//
    var profile_image = dt.profile_image;
    delete dt.profile_image;
    //@========================================//

    //@ Getting lng and lat for radius filter ==============//
    if (dt.state) {
      let state_name = await DBServices.GetData(db.list_states, {  where: { id: dt.state } });
      let coordinate = await GetLatitudeAndLongitudeFromAddressWithRetry(dt.post_code, dt.suburb, state_name.data.name);
      if (coordinate.status) {
        dt.latitude = coordinate.data.lat;
        dt.longitude = coordinate.data.lng;
      }else{
        res.status(200).json(coordinate);
        return false;
      }//End if condition
    }//End if condition
    //@======================================================//

    // console.log(dt);
    response = await DBServices.PostOrUpdate(db.users, dt);
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
    response.successMsg = `Profile has been updated successfully`;
    response.successNotifyType = 'message';
    response.data = dt;//@ Important to update on front-end context api
    // console.log(response.data)
    res.status(200).json(response);
  },//End function

  GetList: async (req, res) => {
    let response = await DBServices.GetDataList(db.list_states, { attributes: [['id', 'value'], ['name', 'label']] });
    res.status(200).json(response);
  },//End function

}//End Export