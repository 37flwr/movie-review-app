const { otpLength } = require("../constants/otpLength");
const User = require("../models/user");
const EmailVerificationToken = require("../models/emailVerificationToken");
const nodemailer = require("nodemailer");
const { isValidObjectId } = require("mongoose");
const { generateOTP, generateMailTransporter, sendError } = require("../lib");
const { sendSuccess } = require("../lib/helper");

exports.create = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) return sendError(res, "This email is already in use");

  const newUser = new User({
    name,
    email,
    password,
  });

  await newUser.save();

  const OTP = generateOTP();

  const newEmailVerificationToken = new EmailVerificationToken({
    owner: newUser._id,
    token: OTP,
  });
  await newEmailVerificationToken.save();

  var transport = generateMailTransporter();

  transport.sendMail({
    from: "verification@reviewapp.com",
    to: newUser.email,
    subject: "Email verification",
    html: `
    <p>Your verification token</p><h1>${OTP}</h1>`,
  });

  sendSuccess(res, "Please verify your email. OTP has been sent to your email");
};

exports.verifyEmail = async (req, res) => {
  const { userId, OTP } = req.body;

  if (!isValidObjectId(userId)) return sendError(res, "Invalid user");

  const user = await User.findById(userId);

  if (user.isVerified) return sendError(res, "User is already verified");

  const token = await EmailVerificationToken.findOne({ owner: userId });

  if (!token) return sendError(res, "Token not found");

  const isMatched = token.compareToken(OTP);

  if (!isMatched) return sendError(res, "Please submit a valid OTP");

  user.isVerified = true;

  await user.save();

  await EmailVerificationToken.findByIdAndDelete(token._id);

  sendSuccess(res, "Your email has been successfully verified");
};

exports.resendEmailVerificationToken = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);
  if (!user) return sendError(res, "User not found");

  if (user.isVerified)
    return sendError(res, "This email is already in verified");

  const tokenExist = await EmailVerificationToken.findOne({ owner: userId });

  if (tokenExist)
    return sendError(res, "Only after one hour new token can be generated");

  const OTP = generateOTP();

  const newEmailVerificationToken = new EmailVerificationToken({
    owner: user._id,
    token: OTP,
  });
  await newEmailVerificationToken.save();

  var transport = generateMailTransporter();

  transport.sendMail({
    from: "verification@reviewapp.com",
    to: user.email,
    subject: "Email verification",
    html: `
    <p>Your verification token</p><h1>${OTP}</h1>`,
  });

  sendSuccess(res, "Please verify your email. OTP has been sent to your email");
};
