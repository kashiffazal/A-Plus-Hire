import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ContextAPI from "../../../../context";
import { RedirectOnLogin, GetUserCookie, RedirectToDashboard, HTTP, UpdateUserCookie } from '../../../services';
import Header from '../mutual/header';
import Footer from '../mutual/footer';
import StripePaymentForm from '../../mutual/stripe-payment';
import PaymentThankYouMsg from '../../pages/buy-connects/payment-thank-you-msg';
import ScreenLoader from '../../../mutualComponents/screen-loader';

const Payment = () => {
  const context = useContext(ContextAPI);
  const navigate = useNavigate();
  const ud = GetUserCookie();

  const [showThankYouMsg, setShowThankYouMsg] = useState(false);
  const [thanksMsgData, setThanksMsgData] = useState({})
  const [updateLoader, setUpdateLoader] = useState(false);

  const UpdatePaymentStatus = () => {
    setUpdateLoader(true);
    HTTP('post','/updateFirstPaymentStatus', { userId: ud.id }).then(res => {
      setUpdateLoader(false);
      if (!res) return false;
      UpdateUserCookie({ payment_done: true, ask_payment: false });
      setShowThankYouMsg(true);
    });
  }//End function



  useEffect(() => {
    //@ If there is no Cookie then redirect to Login Screen
    if (RedirectOnLogin()) { navigate(RedirectOnLogin()); }//End if condition
    //@ If there is no list then get from server
  });

  return (
    <div className='bg-[var(--bgColor)]'>
      <Header menuType="sw-Form" showOnMobile />
      <div className="container mx-auto">

        <div className="flex items-center justify-center min-h-[calc(100vh-96px)] py-4">
          {!showThankYouMsg ?
            <ScreenLoader active={updateLoader}>
              {ud.package_ref_id &&
                <StripePaymentForm
                  callBackOnSuccess={(thankYouMsgObj) => {
                    setThanksMsgData(thankYouMsgObj);
                    UpdatePaymentStatus();
                  }}
                  packageId={ud.package_ref_id}
                  heading="Payment (Accept all kind of cards)"
                  desc="After payment you will be redirected to your profile form"
                />}
            </ScreenLoader>
            :
            <div className="portal-container lg:min-w-[990px]">
              <PaymentThankYouMsg
                title={thanksMsgData.title}
                subTitle={thanksMsgData.subTitle}
                desc={thanksMsgData.desc}
                btnLabel='Redirect To Your Profile Form'
                btnAction={() => navigate(RedirectToDashboard())}
              />
            </div>
          }
        </div>

      </div>
      <Footer context={context} />
    </div>
  )//End return
}//End function

export default Payment;