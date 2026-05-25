"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationHandler = authenticationHandler;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helpers_1 = require("../services/helpers");
async function authenticationHandler(req, res, next) {
    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            return (0, helpers_1.sendError)(res, {
                success: false,
                message: 'JWT secret missing',
            });
        }
        const token = req.cookies?.accessToken;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided',
            });
        }
        const decoded = jsonwebtoken_1.default.verify(req.cookies.accessToken, JWT_SECRET);
        if (!decoded?.userId) {
            return (0, helpers_1.sendError)(res, {
                success: false,
                message: 'Invalid token payload',
            });
        }
        if (!decoded?.role) {
            return (0, helpers_1.sendError)(res, {
                success: false,
                message: 'Unauthorized user',
            }, 401);
        }
        req.userId = decoded.userId;
        next();
    }
    catch (err) {
        if (err instanceof Error) {
            return (0, helpers_1.sendError)(res, {
                success: false,
                message: err.message,
            });
        }
        return (0, helpers_1.sendError)(res, {
            success: false,
            message: 'Authentication failed',
        }, 401);
    }
}
