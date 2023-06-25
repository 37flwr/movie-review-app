const { otpLength } = require("../constants/otpLength");
const nodemailer = require("nodemailer");

const generateOTP = () => {
  let OTP = "";
  for (let i = 0; i <= otpLength; i++) {
    OTP += Math.round(Math.random() * 9);
  }
  return OTP;
};

const generateMailTransporter = () =>
  nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

module.exports = {
  generateOTP,
  generateMailTransporter,
};
