const User = require("../models/user");
const PasswordResetToken = require("../models/passwordResetToken");
const EmailVerificationToken = require("../models/emailVerificationToken");
const { isValidObjectId } = require("mongoose");
const {
  generateOTP,
  generateMailTransporter,
  sendError,
  sendSuccess,
  generateRandomBytes,
} = require("../lib");

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
  if (!user) return sendError(res, "User not found", 404);

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

  const transport = generateMailTransporter();

  transport.sendMail({
    from: "verification@reviewapp.com",
    to: user.email,
    subject: "Email verification",
    html: `
    <p>Your verification token</p><h1>${OTP}</h1>`,
  });

  sendSuccess(res, "Please verify your email. OTP has been sent to your email");
};

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) return sendError(res, "Email is missing");

  const user = await User.findOne({ email });
  if (!user) return sendError(res, "No user found");

  const alreadyHasToken = await PasswordResetToken.findOne({ owner: user._id });
  if (alreadyHasToken)
    return sendError(res, "You can request new token after one hour");

  const token = await generateRandomBytes();
  const newPasswordResetToken = await PasswordResetToken({
    owner: user._id,
    token,
  });
  await newPasswordResetToken.save();

  const resetPasswordUrl = `http://localhost:3000/reset-password?token=${token}&id=${user._id}`;

  const transport = generateMailTransporter();

  transport.sendMail({
    from: "verification@reviewapp.com",
    to: user.email,
    subject: "Reset Password Link",
    html: `
    <p>Click here to reset password</p><a href=${resetPasswordUrl}>Change Password</a>`,
  });

  sendSuccess(res, "Link has been sent to your email");
};

exports.sendResetPasswordTokenStatus = (req, res) => {
  res.json({ valid: true });
};

exports.resetPassword = async (req, res) => {
  const { newPassword, userId } = req.body;

  const user = await User.findById(userId);

  const matched = await user.comparePassword(newPassword);
  if (matched)
    return sendError(res, "New password must be different from old one");

  user.password = newPassword;
  await user.save();

  await PasswordResetToken.findByIdAndDelete(req.resetToken._id);

  sendSuccess(res, "Password has been reset successfully");
};
