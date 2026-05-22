import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'antd';
import ContextAPI from '../../../../context';
import { AntInput } from '../../../mutualComponents/antd-fields';
import { HTTP, Logout } from '../../../services';

import SideImg from './resetAvt.jpg';

const formRef = React.createRef();

const ResetPassword = () => {
  const context = useContext(ContextAPI);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);



  const HandleSubmit = (values) => {
    values.id = context.data.ud.id;
    setLoader(true);
    HTTP('post', '/adminPasswordReset', values).then(res => {
      setLoader(false);
      if (!res) { return false; }
      formRef.current.resetFields();
      navigate(Logout());
    })//End http service
  }//End handleSubmit


  return (
    <div className="portal-container">
      <div className='grid grid-cols-12'>
        <div className='col-span-4 hidden xl:block'>
          <img src={SideImg} alt="Logo" className='w-full my-[-20px] ml-[-20px]' />
        </div>
        <div className='col-span-12 xl:col-span-8 flex items-center justify-center'>
          <div className='md:w-3/5'>
            <h2 className={context.data.h3}>Reset Password</h2>
            <p className='mb-2'>You can reset you password by providing current password.</p>
            <Form ref={formRef} layout="vertical" onFinish={HandleSubmit} autoComplete="off">
              <AntInput label="Current Password" name="current_password" size="large" type="password" placeholder="Please type current password" autoComplete='new-password' />
              <AntInput label="New Password" name="new_password" size="large" type="password" compareMode={true} compareWith="current_password" compareErrorMsg="Current password and New password must not same!" compareNotEqual={true} placeholder="Please type new password" autoComplete='new-password' />
              <AntInput label="Confirm Password" name="confirm_password" type="password" compareMode={true} compareWith="new_password" size="large" placeholder="Enter to confirm your password" autoComplete='new-password' />
              <Button type="primary" htmlType="submit" size="large" className='w-full sm:w-auto' loading={loader} disabled={true}>Submit and Reset</Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )//End return
}//End function
export default ResetPassword;