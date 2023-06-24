const generateOTP = require("./mail");
const generateMailTransporter = require("./mail");

const sendError = require("./helper");

module.exports = { generateOTP, generateMailTransporter, sendError };
