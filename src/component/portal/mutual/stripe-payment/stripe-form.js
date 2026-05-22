import { useState } from 'react';
import { Button, message } from 'antd';
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";

const StripePaymentForm = (pr) => {
  const stripe = useStripe();
  const elements = useElements();

  // const [errorMessage, setErrorMessage] = useState(null);
  // const [successStatus, setSuccessStatus] = useState(false);
  const [loader, setLoader] = useState(false);

  const SubmitPayment = async (e) => {
    e.preventDefault();
    //? Stripe.js has not yet loaded.
    //? Make sure to disable form submission until Stripe.js has loaded.
    if (!stripe || !elements) { return; }
    //? Make Payment
    setLoader(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/completion`, },
      redirect: 'if_required'
    });
    setLoader(false);

    //? Adding Connects or Set Error Msg
    if (!error) {
      message.success(pr.successMsg ? pr.successMsg : 'Payment Successful');
      pr.onClose && pr.onClose();
      pr.callBackOnSuccess && pr.callBackOnSuccess(pr.thankYouMsgData)
    } else {
      message.error(error.message);
    }//End if condition
  }//End function


  return (
    <form onSubmit={SubmitPayment}>
      <PaymentElement />
      <Button className="w-full mt-5" size="large" type="primary" htmlType="submit" disabled={!stripe || !elements} loading={loader}>
        {loader ? "Processing ... " : "Pay Now"}
      </Button>
    </form>
  )//End return
}//End function

export default StripePaymentForm;