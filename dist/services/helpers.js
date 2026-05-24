"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccess = sendSuccess;
exports.sendError = sendError;
function sendSuccess(res, status = 200, message) {
    return res.status(status).json(message);
}
function sendError(sres, message, status = 400) {
    return sres.status(status).json(message);
}
