const { isValidObjectId } = require('mongoose');
const { sendError } = require('../lib');
const PasswordResetToken = require('../models/passwordResetToken');

exports.isValidPasswordResetToken = (req, res, next) => {
    const {token, userId} = req.body;

    if(!token.trim() || !isValidObjectId(userId)) return sendError(res, "Invalid request");

    const resetToken = await PasswordResetToken.findOne({owner: userId});
    if(!resetToken) return sendError(res, "Invalid request");

    const isMatched = resetToken.compareToken(token);
    if(!isMatched) return sendError(res, 'Unasuthorized access, invalid request');

    req.resetToken = resetToken;
    next()
}