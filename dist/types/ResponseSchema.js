"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponseSchema = exports.SuccessResponseSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.SuccessResponseSchema = zod_1.default.object({
    success: zod_1.default.boolean().openapi({ description: 'Indicates if the operation was successful' }),
    message: zod_1.default
        .string()
        .openapi({ description: 'A message describing the result of the operation' }),
    data: zod_1.default.any().optional().openapi({ description: 'Optional data returned from the operation' }),
    errors: zod_1.default
        .string()
        .optional()
        .openapi({ description: 'Optional error messages if the operation failed' }),
});
exports.ErrorResponseSchema = zod_1.default.object({
    success: zod_1.default.boolean().openapi({ description: 'Indicates if the operation was successful' }),
    message: zod_1.default
        .string()
        .openapi({ description: 'A message describing the result of the operation' }),
    errors: zod_1.default
        .string()
        .optional()
        .openapi({ description: 'Optional error messages if the operation failed' }),
});
