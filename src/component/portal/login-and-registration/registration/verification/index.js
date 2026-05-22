import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'antd';
// import Cookies from 'js-cookie';
import { HTTP, ObscureEmail, ObscurePhone, RedirectToDashboard, SetUserCookie } from '../../../../services';
import { AntInput } from '../../../../mutualComponents/antd-fields';
const Verification = (pr) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [resendEmailLoader, setResendEmailLoader] = useState(false);
  const [resendSMSLoader, setResendSMSLoader] = useState(false);

  //@ Scroll to Top on Load
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); })

  const Verify = (values) => {
    values.id = pr.regFormData.id;
    setLoader(true);
    HTTP('post', '/verification', values).then(res => {
      setLoader(false);
      if (!res) { return false; }
      // console.log(res);
      let data = res.data;
      if (!data.token) { return false; }
      SetUserCookie(res.data);//# Set user data with token in cookies
      // Cookies.set('uData', JSON.stringify(res.data));
      navigate(RedirectToDashboard());//# Navigate on condition
    });
  }//End function

  const ResentEmail = () => {
    setResendEmailLoader(true);
    HTTP('get', '/resendVerificationEmail/' + pr.regFormData.id).then(res => {
      setResendEmailLoader(false);
      if (!res) { return false; }
      // console.log(res);
    });
  }//End function

  const ResentSMS = () => {
    setResendSMSLoader(true);
    HTTP('get', '/resendVerificationSMS/' + pr.regFormData.id).then(res => {
      setResendSMSLoader(false);
      if (!res) { return false; }
      // console.log(res);
    });
  }//End function
  const login = pr.fromLoginScreen;
  return (
    <div className={login ? '' : 'w-full lg:w-3/5 mx-auto'}>

      <div className='text-center mb-8'>
        <h3 className={pr.context.data.h3}><span className={login ? 'font-semibold' : ''}>Account verification</span> required</h3>
        <div className='text-base'>(By Email and Mobile Number)</div>
      </div>
      <Form onFinish={Verify} layout="vertical" autoComplete="off" className="form-style">
        <div className='grid grid-cols-12 gap-2 items-center'>
          <div className={`col-span-7 ${!login && 'sm:col-span-8'} mb-1`}>
            <AntInput label="Email Verification Code" name="email_code" size="large" placeholder="Type code from your email" />
          </div>
          <div className={`col-span-5 ${!login && 'sm:col-span-4'}`}>
            <Button type="dashed" size="large" className="btn-light w-full mt-5 !text-sm lg:!text-base" loading={resendEmailLoader} onClick={() => ResentEmail()}>{resendEmailLoader ? 'Sending' : 'Resend Email'}</Button>
          </div>
          <div className={`col-span-7 ${!login && 'sm:col-span-8'} mb-1`}>
            <AntInput label="Mobile Verification Code" name="mobile_code" size="large" placeholder="Type code from sms" />
          </div>
          <div className={`col-span-5 ${!login && 'sm:col-span-4'}`}>
            <Button type="dashed" size="large" className="btn-light w-full mt-5 !text-sm lg:!text-base" loading={resendSMSLoader} onClick={() => ResentSMS()}>{resendSMSLoader ? 'Sending' : 'Resend SMS'}</Button>
          </div>

          <div className={`col-span-7 ${!login && 'sm:col-span-8'} mt-3`}>
            <div className='text-sm text-[var(--colorPrimary)]'>Please check your Inbox or spam/junk folder and also sms on your mobile.</div>
          </div>
          <div className={`col-span-5 ${!login && 'sm:col-span-4'} mt-3`}>
            <Button type="primary" size="large" htmlType="submit" className="btn-shadow w-full" loading={loader}>
              Verify
            </Button>
          </div>
        </div>
      </Form>

      <div className={`mt-5 p-2 text-[12px] text-[var(--colorPrimary)]  text-center border border-dashed border-[var(--borderColor)] rounded bg-[var(--${login ? 'bgPrimary' : 'bgColor'})]`}>
        <span className=''>Sent Email and SMS at {ObscureEmail(pr.regFormData.email)} & {ObscurePhone(pr.regFormData.mobile_number)}</span>
      </div>


    </div>
  )//End return
}//End function

export default Verification;