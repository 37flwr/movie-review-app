const express = require("express");
const {
  create,
  verifyEmail,
  resendEmailVerificationToken,
  resetPassword,
  sendResetPasswordTokenStatus,
} = require("../controllers/user");
const { isValidPasswordResetToken } = require("../middlewares/user");
const { validate, userValidator } = require("../middlewares/validator");

const router = express.Router();

router.post("/create", userValidator, validate, create);
router.post("/verify-email", verifyEmail);
router.post("/resend-email-verification-token", resendEmailVerificationToken);
router.post("/reset-password", resetPassword);
router.post(
  "/verify-password-reset-token",
  isValidPasswordResetToken,
  sendResetPasswordTokenStatus
);

module.exports = router;
