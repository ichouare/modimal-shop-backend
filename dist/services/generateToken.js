"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateAccessToken(user) {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET)
        return;
    return jsonwebtoken_1.default.sign(user, JWT_SECRET, {
        expiresIn: '15m',
    });
}
function generateRefreshToken(user) {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET)
        return;
    return jsonwebtoken_1.default.sign(user, JWT_SECRET, {
        expiresIn: '1d',
    });
}
