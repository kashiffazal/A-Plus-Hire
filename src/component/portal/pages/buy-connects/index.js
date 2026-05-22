import { useState, useContext, useEffect } from 'react';
import { Modal } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ContextAPI from '../../../../context';
import { HTTP, UpdateUserCookie } from '../../../services';
import PackageBox from '../../../website/pages/pricing/partial/package-box';
import ScreenLoader from '../../../mutualComponents/screen-loader';
import StripePaymentFormModal from '../../mutual/stripe-payment/modal';
import PaymentThankYouMsg from './payment-thank-you-msg';
//@ Stripe Integration
// import { loadStripe } from '@stripe/stripe-js';

const BuyConnects = () => {
  const context = useContext(ContextAPI);
  const navigate = useNavigate();
  const param = useParams();

  const [loader, setLoader] = useState(false);
  const [modal, contextHolder] = Modal.useModal();
  const [showThanksMsg, setShowThanksMsg] = useState(false);
  const [thanksMsgData, setThanksMsgData] = useState({});
  // const [loaderStripePayment, setLoaderStripePayment] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState({});

  const TakePlan = (packageData) => {
    let values = {
      user_ref_id: context.data.ud.id,
      package_ref_id: packageData.id
    };
    setLoader(true);
    HTTP('post', '/updateConnectsByPlan', values).then(res => {
      setLoader(false);
      if (!res) { return false; }
      //@ Update connects in context (connects count is showing in header)
      UpdateUserCookie({ connects: res.connects });
      context.updateData({ ud: { ...context.data.ud, connects: res.connects } });
      setShowThanksMsg(res.showThanksMsg);
      setThanksMsgData(res.thankMsg);
    });
  }//End function

  // const GetStripePublicKeyAndMakePayment = (e) => {
  //   setLoaderStripePayment(true);
  //   HTTP('get', '/getStripePublicKey').then(res => {
  //     if (!res) {
  //       setLoaderStripePayment(false);
  //       return false;
  //     }//End if condition
  //     MakeStripePayment(e, res.publicKey);
  //   });//End Getting Stripe Public Key
  // }//End function

  // const MakeStripePayment = async (e, STRIPE_PUBLIC_KEY) => {
  //   const stripe = await loadStripe(STRIPE_PUBLIC_KEY);
  //   let postData = {
  //     user_ref_id: context.data.ud.id,
  //     package_ref_id: e.id
  //   };
  //   setLoaderStripePayment(true);
  //   HTTP('post', '/paymentWithStripe', postData).then(res => {
  //     setLoaderStripePayment(false);
  //     if (!res) { return false; }
  //     // console.log(res);
  //     // return false;
  //     stripe.redirectToCheckout({
  //       sessionId: res.stripe_session.id //@ It's Stripe Session Id - required to redirect and checkout
  //     })
  //   });
  //   // TakePlan(e);
  // }//End function

  const Confirm = (e) => {
    modal.confirm({
      // width: 400,
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: <span>Are {openPaymentModal ? 'TRUE' : 'FALSE'}you sure to buy <span className='font-semibold'>{e.name}</span> plan form <span className='font-semibold'>{e.connects}</span> connects?</span>,
      onOk: () => {
        setSelectedPackage(e);
        setOpenPaymentModal(true);
      },
      okText: 'Yes',
      cancelText: 'No',
    });
  };

  useEffect(() => {
    if (param.action === 'thankYou') {
      setThanksMsgData({
        title: 'Congratulations & Thank You',
        subTitle: 'for buying more connects',
        desc: 'Connects has been added into your accounts',
        btnLabel: 'Search your perfect co-worker'
      });
      setShowThanksMsg(true);
    }//End if condition
    if (param.action === 'cancel') {

    }//End if condition
  }, [param.action])

  return (
    <div className="portal-container md:px-10 md:py-10">
      <ScreenLoader active={loader}>
        {!showThanksMsg ?
          <PackageBox portal={true} takePlan={(e) => Confirm(e)} />
          :
          <PaymentThankYouMsg
            title={thanksMsgData.title}
            subTitle={thanksMsgData.subTitle}
            desc={thanksMsgData.desc}
            btnLabel={thanksMsgData.btnLabel}
            btnAction={() => navigate('/app/search')}
          />
        }
      </ScreenLoader>
      <StripePaymentFormModal
        callBackOnSuccess={() => TakePlan(selectedPackage)}
        packageId={selectedPackage.id}
        open={openPaymentModal}
        onClose={() => setOpenPaymentModal(false)}
      />
      {contextHolder}
    </div>
  )//End return
}//End function

export default BuyConnects;