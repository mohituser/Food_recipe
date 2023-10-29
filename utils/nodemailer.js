const nodemailer = require("nodemailer");
// let user=[{mail:"mm5005672@gmail.com"}];

const mailHelper=async(option)=>{
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mohit7089237060@gmail.com',
      pass: 'awddjnanaocrowbt'
    }
  });
  
  var mailOptions = {
    from: 'mohit7089237060@gmail.com',
    to: option.email,
    subject: option.subject,
    // html:option.Quotes,
    text: option.message,
  };

  await transporter.sendMail(mailOptions);
  
}

module.exports=mailHelper;