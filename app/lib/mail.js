const { otpLength } = require("../constants/otpLength");

exports.generateOTP = () => {
  let OTP = "";
  for (let i = 0; i <= otpLength; i++) {
    OTP += Math.round(Math.random() * 9);
  }
  return OTP;
};
