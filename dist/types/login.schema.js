"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = void 0;
const zod_to_openapi_1 = require("@asteasolutions/zod-to-openapi");
const zod_1 = require("zod");
(0, zod_to_openapi_1.extendZodWithOpenApi)(zod_1.z);
const LoginSchema = zod_1.z.object({
    email: zod_1.z.string().email().openapi({ description: 'Email of the user' }),
    password: zod_1.z.string().openapi({ description: 'Password of the user' }),
});
exports.LoginSchema = LoginSchema;
