const crypto = require("crypto");

const sendError = (res, error, statusCode = 401) => {
  res.status(statusCode).json({ error });
};

const sendSuccess = (res, message, statusCode = 201) => {
  res.status(statusCode).json({ message });
};

const generateRandomBytes = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(30, (err, buff) => {
      if (err) reject(err);
      const buffString = buff.toString("hex");

      resolve(buffString);
    });
  });
};

module.exports = {
  sendError,
  sendSuccess,
  generateRandomBytes,
};
