import { useState, useEffect, useContext } from 'react';
import { Alert } from 'antd';
import ContextAPI from '../../../../context';
import { HTTP } from '../../../services';
import StripePaymentForm from './stripe-form';
import ScreenLoader from '../../../mutualComponents/screen-loader';

//@ Stripe Integration
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const StripePayment = (pr) => {
  const context = useContext(ContextAPI);
  const [loaderStripePayment, setLoaderStripePayment] = useState(false);
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [packageData, setPackageData] = useState(null);
  const [thankYouMsgData, setThankYouMsgData] = useState({});

  const GetStripePublicKeyAndMakePayment = () => {
    //? If there is not package id then stop fetching cred
    if (!pr.packageId) return;
    setLoaderStripePayment(true);
    HTTP('post', '/getStripePaymentIntents', { packageId: pr.packageId }).then(res => {
      setLoaderStripePayment(false);
      if (!res) { return false; }//End if condition
      // console.log(res);
      setStripePromise(loadStripe(res.publicKey));
      setClientSecret(res.clientSecret)
      setPackageData(res.data);
      setThankYouMsgData(res.thankMsg);
    });//End Getting Stripe Public Key
  }//End function

  useEffect(() => { GetStripePublicKeyAndMakePayment(); }, [])
  // console.log(pr);
  return (
    pr.packageId ?
      <div className={`${!pr.modal ? 'portal-container lg:min-w-[900px]' : ''}`}>
        <ScreenLoader active={loaderStripePayment}>
          {pr.heading && <h3 className={context.data.h3}>{pr.heading}</h3>}
          {pr.desc && <p>{pr.desc}</p>}
          {pr.heading && <hr className='mt-2 mb-3' />}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              {loaderStripePayment ?
                <div className='h-[200px]' />
                :
                (stripePromise && clientSecret) ?
                  <Elements stripe={stripePromise} options={{ clientSecret }}><StripePaymentForm {...pr} thankYouMsgData={thankYouMsgData} /></Elements>
                  :
                  <Alert type="error" showIcon message='Some issue from server, check your internet connection and reload page' />
              }
            </div>
            {(pr.packageId && packageData) &&
              <div className='portal-container flex items-center justify-center'>
                <div className='text-center [&>*]:mb-2'>
                  <div className='font-bold text-2xl'>{packageData.name} Plan</div>
                  <div className='font-bold'><span className='text-2xl'>{packageData.currency}</span><span className='text-3xl'>{packageData.price}</span></div>
                  <div className='text-base border-2 border-dashed border-[var(--colorPrimary)] p-[10px] rounded-md bg-[var(--bgPrimary)]'>Connects: <span className='font-semibold'>{packageData.connects}</span></div>
                </div>
              </div>
            }
          </div>
        </ScreenLoader>
      </div>
      :
      <div className='text-center h-[200px] flex items-center justify-center text-lg font-semibold'>Please Provide Plan</div>
  )//End return
}//End function

export default StripePayment;