"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAsUser = loginAsUser;
exports.loginAsAdmin = loginAsAdmin;
exports.RegisterUser = RegisterUser;
exports.default = refreshToken;
exports.loggOut = loggOut;
exports.Auth0Register = Auth0Register;
const helpers_1 = require("../../services/helpers");
const user_module_1 = require("../../modules/user.module");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken_1 = require("../../services/generateToken");
const setCookies_1 = require("../../services/setCookies");
const transporterMail_1 = require("../../services/transporterMail");
async function loginAsUser(req, res) {
    try {
        const existUser = await user_module_1.User.findOne({
            email: req.body.email,
        });
        if (!existUser) {
            return (0, helpers_1.sendError)(res, {
                success: false,
                message: 'Please make to enter a correct criditienls',
            });
        }
        const validatePassword = await bcrypt_1.default.compare(req.body.password, existUser?.password);
        if (!validatePassword) {
            return (0, helpers_1.sendError)(res, { success: false, message: 'Invalid credentials' });
        }
        const AccessToken = (0, generateToken_1.generateAccessToken)({
            userId: existUser?._id?.toString(),
            role: "USER" /* Role.USER */,
        });
        const RefreshToken = (0, generateToken_1.generateRefreshToken)({
            userId: existUser?._id?.toString(),
            role: "USER" /* Role.USER */,
        });
        (0, setCookies_1.setCookies)(res, AccessToken, RefreshToken);
        return (0, helpers_1.sendSuccess)(res, 200, {
            success: true,
            message: 'Your\'re connect succesfully',
        });
    }
    catch (error) {
        return (0, helpers_1.sendError)(res, {
            success: false,
            message: 'Registration failed',
            errors: error?.message,
        });
    }
}
async function loginAsAdmin(req, res) {
    try {
        const existUser = await user_module_1.User.findOne({
            email: req.body.email,
            role: 'ADMIN',
        });
        if (!existUser) {
            return (0, helpers_1.sendError)(res, {
                success: false,
                message: 'Please make to enter a correct criditienls',
            }, 401);
        }
        const validatePassowrd = await bcrypt_1.default.compare(req.body.password, existUser?.password);
        if (!validatePassowrd) {
            return (0, helpers_1.sendError)(res, { success: false, message: 'Invalid credentials' });
        }
        const AccessToken = (0, generateToken_1.generateAccessToken)({
            userId: existUser?._id?.toString(),
            role: "ADMIN" /* Role.ADMIN */,
        });
        const RefreshToken = (0, generateToken_1.generateRefreshToken)({
            userId: existUser?._id?.toString(),
            role: "ADMIN" /* Role.ADMIN */,
        });
        (0, setCookies_1.setCookies)(res, AccessToken, RefreshToken);
        return (0, helpers_1.sendSuccess)(res, 200, {
            success: true,
            message: 'Your\'re connect succesfully',
        });
    }
    catch (error) {
        return (0, helpers_1.sendError)(res, {
            success: false,
            message: 'Registration failed',
            errors: error?.message,
        });
    }
}
async function RegisterUser(req, res) {
    try {
        const existUser = await user_module_1.User.findOne({
            $or: [{ email: req.body.email }, { secondName: req.body.secondName }],
        });
        if (existUser) {
            return (0, helpers_1.sendError)(res, {
                success: false,
                message: 'user with same cridentails is exist !!',
                errors: 'this user is already exist',
            });
        }
        const user = await user_module_1.User.create({
            ...req.body,
        });
        await transporterMail_1.nodeTransporter.sendMail({
            from: 'issam chouaref <issam.chouaref1998@gmail.com>',
            to: user?.email,
            subject: 'Welcome to Your platoforme',
            text: 'Welcome to our platform! We\'re excited to have you on board. If you have any questions or need assistance, feel free to reach out to our support team.\n\nBest regards,\nThe Team',
        });
        return (0, helpers_1.sendSuccess)(res, 200, {
            success: true,
            message: 'Your acount is add successfully',
        });
    }
    catch (error) {
        return (0, helpers_1.sendError)(res, {
            success: false,
            message: 'Registration failed',
            errors: error?.message || 'Somthing wrong !!',
        });
    }
}
async function refreshToken(req, res) {
    const JWT_SECRET = process.env.JWT_SECRET;
    try {
        if (!JWT_SECRET)
            return;
        const decodeResult = jsonwebtoken_1.default.verify(req.cookies.refreshToken, JWT_SECRET);
        const AccessToken = (0, generateToken_1.generateAccessToken)({
            userId: decodeResult?.userId,
            role: decodeResult?.role,
        });
        res.cookie('accessToken', AccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 15 * 60 * 1000, // 15 minutes
        });
        return (0, helpers_1.sendSuccess)(res, 200, {
            success: true,
            message: 'Token is valid',
        });
    }
    catch (error) {
        return (0, helpers_1.sendError)(res, {
            success: false,
            message: 'Token is not valid',
            errors: error?.message || 'Somthing wrong !!',
        });
    }
}
async function loggOut(req, res) {
    try {
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        (0, helpers_1.sendSuccess)(res, 200, {
            success: true,
            message: 'user is logout successfully',
        });
    }
    catch (error) {
        {
            return (0, helpers_1.sendError)(res, {
                success: false,
                message: 'Logout failed',
                errors: error?.message || 'Somthing wrong !!',
            });
        }
    }
}
async function Auth0Register(req, res) {
    try {
        const { email, name, secondName, avatar } = req.body;
        const user = await user_module_1.User.findOneAndUpdate({ email }, {
            $setOnInsert: {
                email,
                firstName: name,
                secondName,
                avatar,
                verify: true,
                authProvider: 'auth0',
            },
        }, {
            new: true,
            upsert: true,
        });
        const AccessToken = (0, generateToken_1.generateAccessToken)({
            userId: user._id.toString(),
            role: user.role,
        });
        const RefreshToken = (0, generateToken_1.generateRefreshToken)({
            userId: user._id.toString(),
            role: user.role,
        });
        (0, setCookies_1.setCookies)(res, AccessToken, RefreshToken);
        return (0, helpers_1.sendSuccess)(res, 200, {
            success: true,
            message: 'User authenticated successfully',
        });
    }
    catch (error) {
        return (0, helpers_1.sendError)(res, {
            success: false,
            message: 'Auth failed',
            errors: error?.message || 'Somthing wrong !!',
        });
    }
}
