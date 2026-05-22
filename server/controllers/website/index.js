const db = require('../../models');
const DBServices = require('../../services/db-services');
const { SendEmail, EmailTemplate } = require('../../services');

module.exports = {
  ContactFormSend: async (req, res) => {
    let response = await DBServices.PostData(db.web_contact_form, req.body);
    if (response.status) {
      //@ Send Email
      response = await SendEmail({
        // to: `Kashif Fazal <kashiffazalfullstack@gmail.com>`,
        to: `
          ${process.env.COMPANY_NAME} <admin@${process.env.DOMAIN_NAME}>, 
          Kashif Fazal <kashiffazalfullstack@gmail.com>,
          Abid Ilyas <abidilyas786@gmail.com>
        `,
        subject: `${process.env.COMPANY_NAME} - Web Contact Form`,
        html: EmailTemplate('Web Contact Form', 'Someone has submitted contact form on your website', `
          <div style="width: 100%; max-width: 600px; margin: 0 auto;">
            <strong>Full Name:</strong> ${req.body.name}<br>
            <strong>Phone Number:</strong> ${req.body.phone}<br>
            <strong>Email Address:</strong> ${req.body.email}<br>
            <strong>What Type:</strong> ${req.body.message_type}<br>
            <strong>Message:</strong><br> ${req.body.message.replace(/\n/g, '<br>')}
          </div>
        `)
      });
    }//End if condition
    //# Setting Success msg
    response.successNotify = true;
    response.successTitle = 'Success';
    response.successMsg = `Form has been submitted successfully`;
    response.successNotifyType = 'message';
    res.status(200).json(response);
  },//End function
}//End Export