"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../../controllers/v1/user.controller");
const authenticationHandler_1 = require("../../middleware/authenticationHandler");
const validationHandler_1 = require("../../middleware/validationHandler");
const resetPassword_schema_1 = require("../../types/resetPassword.schema");
const router = (0, express_1.default)();
router.get('/me', authenticationHandler_1.authenticationHandler, user_controller_1.currentUser);
router.post('/reset-password', authenticationHandler_1.authenticationHandler, (0, validationHandler_1.validate)({ body: resetPassword_schema_1.ResetPasswordSchema }), user_controller_1.resetPassword);
exports.default = router;
