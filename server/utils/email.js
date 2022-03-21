// CHANGE TO SES
const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async (to, subject, message) => {
  try {
    var smtpConfig = {
      service: 'gmail',
      auth: {
        user: process.env.userEmail,
        pass: process.env.userPassword,
      },
    };
    var transporter = nodemailer.createTransport(smtpConfig);
    var mailOptions = {
      from: '"System Admin - Revels" <webdevrevels22@gmail.com>', // sender address
      // *************TO CHANGE*************
      // to: to, // list of receivers
      // BE CAREFUL WITH THIS CHANGE ON PRODUCTION TO REAL DATA, THIS IS ONLY FOR TESTING
      to: ['webdevrevels22@gmail.com'],
      subject: subject, // Subject line
      text: subject, // plaintext body
      html: message, // html body
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      } else {
        console.log(info.response);
        return transport.close();
      }
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = sendEmail;
