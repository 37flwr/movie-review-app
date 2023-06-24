const express = require("express");
const {
  create,
  verifyEmail,
  resendEmailVerificationToken,
  resetPassword,
} = require("../controllers/user");
const { validate, userValidator } = require("../middlewares/validator");

const router = express.Router();

router.post("/create", userValidator, validate, create);
router.post("/verify-email", verifyEmail);
router.post("/resend-email-verification-token", resendEmailVerificationToken);
router.post("/reset-password", resetPassword);

module.exports = router;
