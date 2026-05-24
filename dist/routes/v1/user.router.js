"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticationHandler_1 = require("../../middleware/authenticationHandler");
const user_controller_1 = require("../../controllers/v1/user.controller");
const validationHandler_1 = require("../../middleware/validationHandler");
const resetPassoword_schema_1 = require("../../types/resetPassoword.schema");
const router = (0, express_1.default)();
router.get('/me', authenticationHandler_1.authenticationHandler, user_controller_1.currentUser);
router.post("/reset-password", authenticationHandler_1.authenticationHandler, (0, validationHandler_1.validate)({ body: resetPassoword_schema_1.ResetPasswordSchema }), user_controller_1.restPassword);
exports.default = router;
