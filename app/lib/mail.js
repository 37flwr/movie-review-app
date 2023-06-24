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
      user: "6831398ae0f3ce",
      pass: "3b3dbfd3b979e9",
    },
  });

module.exports = {
  generateOTP,
  generateMailTransporter,
};
