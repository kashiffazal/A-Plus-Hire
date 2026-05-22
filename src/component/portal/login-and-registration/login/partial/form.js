import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Form } from 'antd';
import Verification from '../../registration/verification';
import { AntInput } from '../../../../mutualComponents/antd-fields';
import { HTTP, RedirectToDashboard, SetUserCookie, UpdateAppCookie } from '../../../../services';
import ForgotPasswordForm from './forgor-password';

const LoginAndRegistrationForm = (pr) => {
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);
  const [showForGotPassword, setShowForGotPassword] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [dataForVerification, setDataForVerification] = useState({});

  const login = (values) => {
    setLoader(true);
    HTTP('post', '/login', values).then(res => {
      setLoader(false);
      if (!res) { return false; }
      let data = res.data;
      // console.log(res);
      if (data.type !== 'ua' && (!data.email_verified || !data.mobile_number_verified)) {
        setDataForVerification(data);
        setShowVerification(true);
      } else {
        if (!data.token) { return false; }
        data.tableIndividualColFilter = {
          "allow": true,
          "filterByTypeOrSelect": "select",
          "filterByTypeRunTime": true
        }//End object
        SetUserCookie(data)//# Set user data with token in cookies
        navigate(RedirectToDashboard(false,data));//# Navigate on condition
      }//End if condition
    });
  }//End function

  const RedirectToRegPage = () => {
    UpdateAppCookie({ regType: null });
    navigate('/registration');
  }//End function

  return (
    <div className="w-full">
      <div className='text-center'>
        <NavLink to='/'>
          <img src={`${process.env.PUBLIC_URL}/images/logo-v-final.png`} alt="" className="w-20 mx-auto inline-block" />
        </NavLink>
        <div className='pt-3 pb-5'>
          {!showVerification &&
            (showForGotPassword ?
              <>
                <h4 className={pr.context.data.h4}>Forgot Password</h4>
                <p>Enter your email address to reset your password</p>
              </>
              :
              <>
                <h4 className={pr.context.data.h4}><span className='font-semibold'>Welcome to</span> {pr.context.data.app_data.company_name}</h4>
                <p>Login to access your account</p>
              </>
            )
          }
        </div>
      </div>
      {!showVerification &&
        <>
          {showForGotPassword ?
            <ForgotPasswordForm redirectToLogin={() => setShowForGotPassword(false)} />
            :
            <>
              <Form onFinish={login} layout="vertical" autoComplete="off" >
                <AntInput name="username" size="large" placeholder="Please enter your email address" />
                <AntInput name="password" size="large" type="password" placeholder="Please enter your password" />
                <div className='flex justify-between items-center'>
                  <Button type="primary" size="large" htmlType="submit" className="btn-shadow w-2/5" loading={loader}>
                    Log In
                  </Button>
                  <button type="button" onClick={() => setShowForGotPassword(true)} className="btn-to-link-color text-sm sm:text-base">Forgot Password?</button>
                </div>
              </Form>
              <div className='text-sm sm:text-base mt-5 p-3 flex justify-between items-center border border-dashed border-[var(--borderColor)] rounded bg-[var(--bgPrimary)]'>
                <p>New here?</p>
                {/* <NavLink to='/registration'> */}
                <button type="button" onClick={() => RedirectToRegPage()} className="btn-to-link-color text-sm sm:text-base">Sign Up for and account</button>
                {/* </NavLink> */}
              </div>
            </>
          }
        </>
      }

      {showVerification && <Verification fromLoginScreen={true} context={pr.context} regFormData={dataForVerification} />}

    </div>
  )//End return
}//End function

export default LoginAndRegistrationForm;