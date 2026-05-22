import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Divider } from 'antd';
import ContextAPI from '../../../../../context';
import UploadImage from '../../../../mutualComponents/andt-upload-and-crop-image-component';
import { AntInput } from '../../../../mutualComponents/antd-fields';
import { HTTP, RandomAlphaNumber } from '../../../../services';
import ScreenLoader from '../../../../mutualComponents/screen-loader';

const formRef = React.createRef();

const CreateAdminUser = (pr) => {
  const context = useContext(ContextAPI);

  const [loader, setLoader] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const [profileImageCurrent, setProfileImageCurrent] = useState('');
  const [profileImageNew, setProfileImageNew] = useState(false);
  // const [dataLoaded, setDataLoaded] = useState(false);
  const [formData, setFormData] = useState(null);

  const SubmitForm = (values) => {
    setBtnLoader(true);
    HTTP('post', '/adminUserForm', { ...values, profile_image: profileImageNew }).then(res => {
      setBtnLoader(false);
      if (!res) { return false; }
      formRef.current.resetFields();
      pr.close && pr.close();
      pr.refreshRecentUser && pr.refreshRecentUser();
      // console.log(res);
      if (res.data.profile_image) { values.profile_image = res.data.profile_image + '?p=' + RandomAlphaNumber(); }
      // console.log(values);
      if (values.id) {
        pr.updateData && pr.updateData(values);
      } else {
        values.id = res.id;
        pr.appendData && pr.appendData(values);
      }//End if condition
    });
  }//End function

  const GetUserData = (id) => {
    setLoader(true);
    HTTP('get', '/adminUserFormData/' + id).then(res => {
      setLoader(false);
      if (!res) { return false; }
      setFormData(res.data);
      // setDataLoaded
      setProfileImageCurrent(res.data.profile_image)
      // setState({ profileOldImgName: res.data.profileImage, profileImageCurrent: res.data.profileImageCurrent });
    });
  }//End function

  useEffect(() => { pr.id && GetUserData(pr.id); }, [pr.id]);
  useEffect(() => { (formData && formRef.current) && formRef.current.setFieldsValue(formData) }, [formData]);

  return (
    <div>
      <ScreenLoader active={loader}>
        <Form layout="vertical" className='form-style' autoComplete="off" ref={formRef} onFinish={SubmitForm}>
          <div className="flex">
            <div>
              <UploadImage
                // defaultImageUrl={profileImageNew ? profileImageNew : profileImageCurrent}
                defaultImageUrl={profileImageNew ? profileImageNew : (profileImageCurrent ? process.env.REACT_APP_API_URL + '/profile_images/' + profileImageCurrent + '?p=' + RandomAlphaNumber() : null)}
                onChange={(e) => setProfileImageNew(e)} type="image" imageType="square" />
            </div>
            <div className={`w-full ml-6 grid grid-cols-1 md:grid-cols-3 ${context.data.portal_grid_gap}`}>
              <AntInput name="id" containerClassName='hidden' noRequired={true} />
              <div className='md:col-span-3'>
                <Divider orientation="left" orientationMargin={0} className="!my-0 divider-primary">User General Details</Divider>
              </div>
              <AntInput label="Full name" name="full_name" placeholder="Please type first name" />
              <AntInput label="Email" type="email" name="email" placeholder="Please type email" />
              <AntInput label="Mobile Number" name="mobile_number" placeholder="Please mobile number" noRequired={true} />
              <div className='md:col-span-3'>
                <Divider orientation="left" orientationMargin={0} className="!my-0 divider-primary">User Account Credentials</Divider>
              </div>
              <AntInput type="select" label="Account Status" name="status" placeholder="Please select user role" options={[
                { value: 'Active', label: 'Active' },
                { value: 'In Active', label: 'In Active' },
              ]} filter={true} />
              <AntInput label="Username" name="username" placeholder="Please type username" autoComplete='off' />
              <AntInput type="password" label="Password" name="password" placeholder="Please type password" autoComplete='new-password' />
            </div>
          </div>
          <hr className='my-5' />
          <div className="text-right">
            <Button size="large" type="primary" htmlType="submit" loading={btnLoader}>
              {pr.id ? 'Update User' : 'Add New User'}
            </Button>
          </div>
        </Form>
      </ScreenLoader>

    </div>
  )//End return
}//End function


export default CreateAdminUser;