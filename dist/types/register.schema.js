"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TSchema = void 0;
const zod_to_openapi_1 = require("@asteasolutions/zod-to-openapi");
const zod_1 = require("zod");
(0, zod_to_openapi_1.extendZodWithOpenApi)(zod_1.z);
exports.TSchema = zod_1.z.object({
    firstName: zod_1.z.string().openapi({ description: 'firstName of the user' }),
    secondName: zod_1.z.string().openapi({ description: 'secondName of the user' }),
    email: zod_1.z.string().email().openapi({ description: 'email of the user' }),
    password: zod_1.z.string().openapi({ description: 'password of the user' }).optional(),
    avatar: zod_1.z.string().openapi({ description: 'avatar of the user' }).optional(),
});
