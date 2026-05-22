const { SendEmail, EmailTemplate, GetLatitudeAndLongitudeFromAddress } = require('../../services');

module.exports = {

  SendTestEmail: async (req, res) => {
    let receiverName = 'Kashif Fazal';
    let receiverEmail = 'kashiffazalfullstack@gmail.com';
    let response = await SendEmail({
      to: `${receiverName} <${receiverEmail}>`,
      subject: `Test sent by on ${process.env.COMPANY_NAME}`,
      html: EmailTemplate(`Test`, `Sent you a message By ${process.env.COMPANY_NAME}`, `
        <div style="white-space: pre-wrap">asdfasdf ${process.env.COMPANY_NAME} #${process.env.PRIMARY_COLOR}</div>
      `)
    });
    response.successNotify = true;
    response.successTitle = 'Success';
    response.successMsg = `Message has been sent to ${receiverName}`;
    response.successNotifyType = 'notify';
    res.status(200).json(response);
  },//End function



  // Example usage
  GetLatitudeAndLongitudeFromAddress: async (req, res) => {
    // const address = "PO Box 83496, South Australia, South Australia, 5874";
    const address = "3196, chelsea, Victoria "
    let response = await GetLatitudeAndLongitudeFromAddress(address);
    // console.log(data);
    res.status(200).json(response);
  },//End function


}//End Export