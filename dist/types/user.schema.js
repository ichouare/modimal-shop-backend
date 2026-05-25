"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_to_openapi_1 = require("@asteasolutions/zod-to-openapi");
const zod_1 = require("zod");
(0, zod_to_openapi_1.extendZodWithOpenApi)(zod_1.z);
exports.userSchema = zod_1.z.object({
    firstName: zod_1.z.string().openapi({ description: 'firstName of the user' }),
    secondName: zod_1.z.string().openapi({ description: 'secondName of the user' }),
    email: zod_1.z.string().openapi({ description: 'email of the user' }),
    password: zod_1.z.string().openapi({ description: 'password of the user' }),
    authProvider: zod_1.z
        .enum(['local', 'auth0'])
        .openapi({ description: 'auth provider of the user' }),
    verify: zod_1.z.boolean().openapi({ description: 'verify of the user' }),
    updatedAt: zod_1.z.date().openapi({ description: 'updatedAt of the user' }),
    loginAt: zod_1.z.date().openapi({ description: 'loginAt of the user' }),
    role: zod_1.z.enum(['USER', 'ADMIN']).openapi({ description: 'role of the user' }),
    avatar: zod_1.z.string().openapi({ description: 'avatar of the user' }),
    favoritsProduct: zod_1.z
        .array(zod_1.z.string())
        .openapi({ description: 'favoritsProduct of the user' }),
    pymemtId: zod_1.z.string().openapi({ description: 'pymemtId of the user' }),
    shoppingCartId: zod_1.z
        .string()
        .openapi({ description: 'shoppingCartId of the user' }),
});
