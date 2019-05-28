"use strict";
const nodemailer = require("nodemailer");
require('dotenv').config();

// async..await is not allowed in global scope, must use a wrapper
async function main(gmail, randomCode){
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "lequanghai.dtu2010", // generated ethereal user
      pass: process.env.PASSWORD_EMAIL // generated ethereal password
    }
  });
    
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: gmail, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<p>Hãy nhập mã code nào vào form để đặt lại mật khẩu mới  ${randomCode} </p>`
  });
  
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  return info;
}
module.exports = main;
