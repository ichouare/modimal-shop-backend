"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordSchema = void 0;
const zod_to_openapi_1 = require("@asteasolutions/zod-to-openapi");
const zod_1 = __importDefault(require("zod"));
(0, zod_to_openapi_1.extendZodWithOpenApi)(zod_1.default);
const ResetPasswordSchema = zod_1.default
    .object({
    password: zod_1.default
        .string()
        .openapi({ description: ' Current password of the user' }),
    newPassword: zod_1.default
        .string()
        .openapi({ description: ' New password for the user' }),
    confirmPassword: zod_1.default
        .string()
        .openapi({ description: ' Confirm the new password for the user' }),
})
    .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'New password and confirm password must match',
    path: ['confirmPassword'],
});
exports.ResetPasswordSchema = ResetPasswordSchema;
