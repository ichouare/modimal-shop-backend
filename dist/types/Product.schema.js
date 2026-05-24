"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductUploadSchema = exports.ProductFilterQuerySchema = exports.ProductListQuerySchema = exports.ProductZodSchema = exports.ImagesZodSchema = void 0;
const zod_to_openapi_1 = require("@asteasolutions/zod-to-openapi");
const zod_1 = require("zod");
(0, zod_to_openapi_1.extendZodWithOpenApi)(zod_1.z);
exports.ImagesZodSchema = zod_1.z
    .object({
    thumbnail: zod_1.z.string().url('Thumbnail must be a valid URL').openapi({
        example: 'https://example.com/thumb.jpg',
    }),
    images: zod_1.z
        .array(zod_1.z.string().url('Image must be a valid URL'))
        .optional()
        .openapi({ description: 'Additional product image URLs' }),
    colors: zod_1.z.string().optional().openapi({ example: 'navy' }),
})
    .openapi('ProductImage');
exports.ProductZodSchema = zod_1.z
    .object({
    title: zod_1.z.string().min(3, 'Title must be at least 3 characters').openapi({
        example: 'Classic Oxford Shirt',
    }),
    description: zod_1.z.string().optional(),
    images: zod_1.z.array(exports.ImagesZodSchema).min(1, 'At least one image is required'),
    size: zod_1.z.array(zod_1.z.string()).optional().openapi({ example: ['S', 'M', 'L'] }),
    price: zod_1.z.number().min(0, 'Price cannot be negative').openapi({ example: 49.99 }),
    currency: zod_1.z.string().default('MAD'),
    stock: zod_1.z.number().min(0).default(0).openapi({ example: 100 }),
    soldOut: zod_1.z.boolean().optional(),
    careAdvices: zod_1.z.string().optional(),
    fabric: zod_1.z.string().optional().openapi({ example: 'cotton' }),
    shipping: zod_1.z.string().optional(),
    returnMethod: zod_1.z.string().optional(),
})
    .openapi('Product');
exports.ProductListQuerySchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .optional()
        .openapi({ description: 'Filter products by title (case-insensitive)' }),
    limit: zod_1.z.coerce
        .number()
        .optional()
        .openapi({ description: 'Maximum number of products to return', example: 3 }),
    page: zod_1.z.coerce
        .number()
        .optional()
        .openapi({ description: 'Page number for pagination', example: 1 }),
});
exports.ProductFilterQuerySchema = zod_1.z.object({
    color: zod_1.z.string().optional().openapi({ description: 'Filter by image color' }),
    size: zod_1.z.string().optional().openapi({ description: 'Filter by size' }),
    fabric: zod_1.z.string().optional().openapi({ description: 'Filter by fabric' }),
    sort: zod_1.z
        .record(zod_1.z.string(), zod_1.z.coerce.number())
        .optional()
        .openapi({
        description: 'Sort fields as query object, e.g. sort[price]=-1 (requires extended query parser)',
    }),
});
exports.ProductUploadSchema = zod_1.z.object({
    image: zod_1.z.any().openapi({
        type: 'string',
        format: 'binary',
        description: 'Image file (field name: image)',
    }),
});
