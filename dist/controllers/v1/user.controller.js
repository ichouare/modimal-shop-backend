"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = currentUser;
exports.restPassword = restPassword;
const helpers_1 = require("../../services/helpers");
const user_module_1 = require("../../modules/user.module");
const bcrypt_1 = __importDefault(require("bcrypt"));
async function currentUser(req, res) {
    try {
        const userId = req.userId;
        if (!userId)
            return (0, helpers_1.sendError)(res, {
                success: false,
                message: 'Unauthorized user',
            }, 401);
        const user = await user_module_1.User.findById(userId, { password: 0, __v: 0 });
        return (0, helpers_1.sendSuccess)(res, 200, {
            success: true,
            message: 'This is the user profile',
            data: user,
        });
    }
    catch (err) {
        return (0, helpers_1.sendError)(res, {
            success: false,
            message: 'somthing Wrong!!',
        });
    }
}
async function restPassword(req, res) {
    try {
        const { password, newPassword, confirmPassword } = req.body;
        const userId = req.userId;
        if (!userId)
            return (0, helpers_1.sendError)(res, {
                success: false,
                message: 'Unauthorized user',
            }, 401);
        const user = await user_module_1.User.findById(userId).select('password');
        if (!user)
            return (0, helpers_1.sendError)(res, {
                success: false,
                message: 'Unauthorized user',
            }, 401);
        const userExist = await user_module_1.User.findById(userId).select('password');
        if (!userExist)
            return (0, helpers_1.sendError)(res, {
                success: false,
                message: 'Unauthorized user',
            }, 401);
        const validPassword = await bcrypt_1.default.compareSync(password, userExist?.password);
        if (!validPassword) {
            return (0, helpers_1.sendError)(res, {
                success: false,
                message: 'password is not correct',
            });
        }
        const hashPassowrd = await bcrypt_1.default.hash(newPassword, 10);
        if (!hashPassowrd) {
            return (0, helpers_1.sendError)(res, {
                success: false,
                message: 'somthing Wrong!!',
            });
        }
        const UpdateUser = await user_module_1.User.findByIdAndUpdate(userId, {
            password: hashPassowrd,
        });
        return (0, helpers_1.sendSuccess)(res, 201, {
            success: true,
            message: 'password is updated successfully',
        });
    }
    catch (err) {
        return (0, helpers_1.sendError)(res, {
            success: false,
            message: 'somthing Wrong!!',
        });
    }
}
