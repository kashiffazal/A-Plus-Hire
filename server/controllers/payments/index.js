const db = require('../../models');
const DBServices = require('../../services/db-services');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
module.exports = {

  GetStripePaymentIntents: async (req, res) => {
    let response = await DBServices.GetData(db.packages, { where: { id: req.body.packageId } });
    if (response.status) {
      let dt = response.data;
      let price = (dt.sale_price ? dt.sale_price : dt.regular_price);
      response.data.price = price;
      try {
        const paymentIntents = await stripe.paymentIntents.create({
          currency: 'aud',
          amount: price * 100,
          automatic_payment_methods: { enabled: true }
        });
        response.clientSecret = paymentIntents.client_secret;
        response.publicKey = process.env.STRIPE_PUBLIC_KEY;
        response.thankMsg = DBServices.PaymentThankMsg();
      } catch (error) {
        response = {
          status: false,
          errorTitle: 'Stripe Error',
          errorMsg: error.message,
          errorNotifyType: 'notify',//message
          errorDuration: 10,
          errorType: 'db-error',
          errorNotifyIcon: 'error' //'info'
        };
      }// try catch
    }//End if condition
    res.status(200).json(response);
  },//End function


  UpdateFirstPaymentStatus: async (req, res) => {
    let response = await DBServices.PostOrUpdate(db.users, { id: req.body.userId, payment_done: true });
    res.status(200).json(response);
  },//End function


  // StripePayment: async (req, res) => {
  //   let response = await DBServices.GetData(db.packages, { where: { id: req.body.package_ref_id } });
  //   if (response.status) {
  //     let dt = response.data;
  //     const session = await stripe.checkout.sessions.create({
  //       payment_method_types: ['card'],
  //       line_items: [{
  //         price_data: {
  //           currency: 'AUD',
  //           product_data: { name: dt.name },
  //           unit_amount: (dt.sale_price ? dt.sale_price : dt.regular_price) * 100,
  //         },
  //         quantity: 1,
  //       },],
  //       mode: 'payment',
  //       success_url: process.env.STRIPE_REDIRECT_PAGE_INNER,
  //       cancel_url: process.env.STRIPE_CANCEL_PAGE_INNER,
  //     })
  //     response.stripe_session = session;
  //   }//End if condition

  //   res.status(200).json(response);
  // },//End function

  // GetStripePublicKey: async (req, res) => {
  //   res.status(200).json({
  //     status: true,
  //     publicKey: process.env.STRIPE_PUBLIC_KEY
  //   });
  // },
}//End module export