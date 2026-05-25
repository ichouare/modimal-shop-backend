"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamsSchema = void 0;
const zod_to_openapi_1 = require("@asteasolutions/zod-to-openapi");
const zod_1 = __importDefault(require("zod"));
(0, zod_to_openapi_1.extendZodWithOpenApi)(zod_1.default);
const ParamsSchema = zod_1.default.object({
    id: zod_1.default.string().openapi({
        description: 'ID of the resource',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
});
exports.ParamsSchema = ParamsSchema;
