const nodemailer = require("nodemailer");
const {MY_MAIL,MY_PASSWORD,SERVICE,FROM_NAME,FROM_EMAIL}=require('../config/index')
const sendEmail=async (options)=> {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service:SERVICE,
    auth: {
      user: MY_MAIL ,// generated ethereal user
      pass: MY_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
const message={
    from: `${FROM_NAME}<${FROM_EMAIL}>`,
    to: `${options.email}`, // list of receivers
    subject:`${options.subject}`, // Subject line
    text: `${options.message}`, // plain text body
    html:`
    <p>${options.message}</p>
    <a href=${options.URL}>Verify</a>`
  };
  let info = await transporter.sendMail(message)
}
module.exports =sendEmail