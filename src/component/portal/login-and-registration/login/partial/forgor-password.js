import { useState } from 'react';
import { Button, Form } from 'antd';
import { AntInput } from '../../../../mutualComponents/antd-fields';
import { HTTP } from '../../../../services';
import ScreenLoader from '../../../../mutualComponents/screen-loader';

const ForgotPasswordForm = (pr) => {
  const [forgotPassSendEmailLoader, setForgotPassSendEmailLoader] = useState(false);
  const [showCodeForPassword, setShowCodeForPassword] = useState(false);
  const [email, setEmail] = useState(null);
  const [verifyCodeLoader, setVerifyCodeLoader] = useState(false);
  const [resetLoader, setResetLoader] = useState(false);
  const [showResetPassFields, setShowResetPassFields] = useState(false);
  const [userId, setUserId] = useState(null);

  const SendEmail = (values) => {
    setForgotPassSendEmailLoader(true);
    HTTP('post', '/sendEmailForForgotPassword', values).then(res => {
      setForgotPassSendEmailLoader(false);
      if (!res) { return false; }
      setShowCodeForPassword(true);
      setUserId(res.data.id)
    });
  }//End function

  const VerifyCode = (values) => {
    values.email = email;
    values.id = userId;
    setVerifyCodeLoader(true);
    HTTP('post', '/checkForgotPassCode', values).then(res => {
      setVerifyCodeLoader(false);
      if (!res) { return false; };
      setShowResetPassFields(true);
    });
  }//End if condition

  const ResetPassword = (values) => {
    values.id = userId;
    setResetLoader(true);
    HTTP('post', '/resetPasswordByForgot', values).then(res => {
      setResetLoader(false);
      if (!res) { return false; };
      setShowResetPassFields(true);
      pr.redirectToLogin();
    });
  }//End if condition

  return (
    <>
      {!showCodeForPassword ?
        <Form onFinish={SendEmail} layout="vertical" autoComplete="off" >
          <AntInput name="email" size="large" type="email" placeholder="Please enter your email address" onBlur={(e) => setEmail(e)} />
          <div className='flex justify-between items-center'>
            <Button type="primary" size="large" htmlType="submit" className="btn-shadow w-2/5" loading={forgotPassSendEmailLoader}>
              Send Email
            </Button>
            <button type="button" onClick={() => pr.redirectToLogin()} className="btn-to-link-color text-base">Back to Login</button>
          </div>
        </Form>
        :
        <>
          {!showResetPassFields ?
            <ScreenLoader active={forgotPassSendEmailLoader} inline={true} tip={<span className='text-xl relative top-[1px]'>Sending Email, Please wait...</span>} className='!h-[150px]'>
              <Form onFinish={VerifyCode} layout="vertical" autoComplete="off" >
                <AntInput label="Email Verification Code" name="forgot_pass_code" size="large" placeholder="Type code from your email" />
                <div className='flex justify-between items-center'>
                  <Button type="primary" size="large" htmlType="submit" className="btn-shadow w-2/5" loading={verifyCodeLoader}>
                    Verify
                  </Button>
                  <div>
                    <button type="button" onClick={() => SendEmail({ email })} className="btn-to-link-color text-base">Resend</button>
                    <span className='px-2 text-[var(--colorPrimary)] relative top-[-1px]'>|</span>
                    <button type="button" onClick={() => setShowCodeForPassword(false)} className="btn-to-link-color text-base">Back</button>
                  </div>
                </div>
              </Form>
            </ScreenLoader>
            :
            <div>
              <Form onFinish={ResetPassword} layout="vertical" autoComplete="off" >
                <AntInput label="Password" name="new_password" type="password" size="large" placeholder="Please enter your password" autoComplete='new-password' />
                <AntInput label="Confirm Password" name="confirm_password" type="password" compareMode={true} compareWith="new_password" size="large" placeholder="Enter to confirm your password" autoComplete='new-password' />
                <Button type="primary" size="large" htmlType="submit" className="btn-shadow w-full" loading={resetLoader}>
                  Change Password
                </Button>
              </Form>
            </div>
          }
        </>
      }
    </>
  )//End return
}//End function

export default ForgotPasswordForm;