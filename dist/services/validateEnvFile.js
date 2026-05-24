"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envSchema = void 0;
const zod_1 = require("zod");
exports.envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
    PORT: zod_1.z.string().nonempty(),
    URL_DB: zod_1.z.string().nonempty(),
    JWT_SECRET: zod_1.z.string().nonempty(),
    SMTP_SERVER_USERNAME: zod_1.z.string().nonempty(),
    SMTP_SERVER_PASSWORD: zod_1.z.string().nonempty(),
    STRIPE_SECRET_KEY: zod_1.z.string().nonempty(),
    UPLOAD_FOLDER: zod_1.z.string().nonempty(),
});
