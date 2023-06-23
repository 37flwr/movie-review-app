const { otpLength } = require("../constants/otpLength");
const User = require("../models/user");
const EmailVerificationToken = require("../models/emailVerificationToken");
const nodemailer = require("nodemailer");
const { isValidObjectId } = require("mongoose");

exports.create = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists)
    return res.status(401).json({ error: "This email is already in use" });

  const newUser = new User({
    name,
    email,
    password,
  });

  await newUser.save();

  let OTP = "";
  for (let i = 0; i <= otpLength; i++) {
    OTP += Math.round(Math.random() * 9);
  }

  const newEmailVerificationToken = new EmailVerificationToken({
    owner: newUser._id,
    token: OTP,
  });
  await newEmailVerificationToken.save();

  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "6831398ae0f3ce",
      pass: "3b3dbfd3b979e9",
    },
  });

  transport.sendMail({
    from: "verification@reviewapp.com",
    to: newUser.email,
    subject: "Email verification",
    html: `
    <p>Your verification token</p><h1>${OTP}</h1>`,
  });

  res.status(201).json({
    message: "Please verify your email. OTP has been sent to your email",
  });
};

exports.verifyEmail = async (req, res) => {
  const { userId, OTP } = req.body;

  if (!isValidObjectId(userId)) return res.json({ error: "Invalid user" });

  const user = await User.findById(userId);

  if (user.isVerified) return res.json({ error: "User is already verified" });

  const token = await EmailVerificationToken.findOne({ owner: userId });

  if (!token) return res.json({ error: "Token not found" });

  const isMatched = token.compareToken(OTP);

  if (!isMatched) return res.json({ error: "Please submit a valid OTP" });

  user.isVerified = true;

  await user.save();

  await EmailVerificationToken.findByIdAndDelete(token._id);

  res.json({ message: "Your email has been successfully verified" });
};
