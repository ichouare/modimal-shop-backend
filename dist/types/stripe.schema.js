"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderStatusSchema = exports.CreateCheckoutSessionSchema = exports.CheckoutItemSchema = void 0;
const zod_to_openapi_1 = require("@asteasolutions/zod-to-openapi");
const zod_1 = require("zod");
(0, zod_to_openapi_1.extendZodWithOpenApi)(zod_1.z);
exports.CheckoutItemSchema = zod_1.z
    .object({
    _id: zod_1.z.string().openapi({
        description: 'Product MongoDB id',
        example: '507f1f77bcf86cd799439011',
    }),
    name: zod_1.z.string().openapi({
        description: 'Product display name',
        example: 'Cotton T-Shirt',
    }),
    price: zod_1.z.number().openapi({ description: 'Unit price', example: 29.99 }),
    quantity: zod_1.z.number().int().min(1).openapi({ example: 1 }),
    size: zod_1.z.string().optional().openapi({ example: 'M' }),
    color: zod_1.z.string().optional().openapi({ example: 'blue' }),
})
    .openapi('CheckoutItem');
exports.CreateCheckoutSessionSchema = zod_1.z
    .object({
    items: zod_1.z.array(exports.CheckoutItemSchema).min(1),
})
    .openapi('CreateCheckoutSessionBody');
exports.UpdateOrderStatusSchema = zod_1.z
    .object({
    order_id: zod_1.z.string().openapi({
        description: 'ShoppingCart document id returned from checkout',
        example: '507f1f77bcf86cd799439011',
    }),
    success: zod_1.z.boolean().openapi({
        description: 'Whether the Stripe payment completed successfully',
        example: true,
    }),
})
    .openapi('UpdateOrderStatusBody');
