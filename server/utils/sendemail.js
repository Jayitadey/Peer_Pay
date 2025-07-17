
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"PeerPay" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
/*
const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or use SMTP 
    auth: {
      user: "devadeepachakraborty@gmail.com",
      pass: "iqrbihsdadjqjces", // Use App Password if Gmail has 2FA
    },
  });

  const mailOptions = {
    from: "prasunpan2004@gmail.com",
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
*/