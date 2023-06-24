const generateOTP = require("./mail");
const generateMailTransporter = require("./mail");

const sendError = require("./helper");
const sendSuccess = require("./helper");
const generateRandomBytes = require("./helper");

module.exports = {
  generateOTP,
  generateMailTransporter,
  sendError,
  sendSuccess,
  generateRandomBytes,
};
