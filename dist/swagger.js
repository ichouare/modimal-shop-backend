"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registry = void 0;
const zod_to_openapi_1 = require("@asteasolutions/zod-to-openapi");
const express_1 = __importDefault(require("express"));
const swaggerUi = require('swagger-ui-express');
// Generate OpenAPI specification
const options = {
    openapi: '3.0.0',
    info: {
        title: 'e-commerce api',
        version: '1.0.0',
        description: 'Scalable E-commerce  Backend Architecture ',
    },
    servers: [
        {
            url: 'http://localhost:5001',
        },
    ],
};
exports.registry = new zod_to_openapi_1.OpenAPIRegistry();
exports.registry.registerComponent('securitySchemes', 'cookieAuth', {
    type: 'apiKey',
    in: 'cookie',
    name: 'accessToken',
});
// Register all paths here BEFORE generating the spec
const zod_1 = __importDefault(require("zod"));
const login_schema_1 = require("./types/login.schema");
const register_schema_1 = require("./types/register.schema");
const ResponseSchema_1 = require("./types/ResponseSchema");
const Params_schema_1 = require("./types/Params.schema");
const Product_schema_1 = require("./types/Product.schema");
const stripe_schema_1 = require("./types/stripe.schema");
//logged as user
exports.registry.registerPath({
    method: 'post',
    path: '/api/v1/auth/user',
    description: 'login as user',
    summary: 'login',
    request: {
        body: {
            content: {
                'application/json': {
                    schema: login_schema_1.LoginSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: 'user logged in successfully',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.SuccessResponseSchema,
                },
            },
        },
        400: {
            description: 'credentials are not valid',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.ErrorResponseSchema,
                },
            },
        },
    },
    tags: ['authentication'],
});
//logged as admin
exports.registry.registerPath({
    method: 'post',
    path: '/api/v1/auth/admin',
    description: 'login as admin',
    summary: 'login',
    request: {
        body: {
            content: {
                'application/json': {
                    schema: zod_1.default.object({
                        email: zod_1.default
                            .string()
                            .email()
                            .openapi({ description: 'Email of the user' }),
                        password: zod_1.default
                            .string()
                            .openapi({ description: 'Password of the user' }),
                    }),
                },
            },
        },
    },
    responses: {
        200: {
            description: 'user logged in successfully',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.SuccessResponseSchema,
                },
            },
        },
        400: {
            description: 'credentials are not valid',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.ErrorResponseSchema,
                },
            },
        },
        401: {
            description: ' Unauthorized user',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.ErrorResponseSchema,
                },
            },
        },
    },
    tags: ['authentication'],
});
// create new user
exports.registry.registerPath({
    method: 'post',
    path: '/api/v1/auth/register',
    description: 'create new user',
    summary: 'add new user',
    request: {
        body: {
            content: {
                'application/json': {
                    schema: register_schema_1.TSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: 'user created successfully',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.SuccessResponseSchema,
                },
            },
        },
        400: {
            description: 'credentials are not valid',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.ErrorResponseSchema,
                },
            },
        },
    },
    tags: ['authentication'],
});
// auth0 register
exports.registry.registerPath({
    method: 'post',
    path: '/api/v1/auth/auth0',
    description: 'login as user',
    summary: 'login',
    security: [{ cookieAuth: [] }],
    request: {
        body: {
            content: {
                'application/json': {
                    schema: zod_1.default.object({
                        email: zod_1.default
                            .string()
                            .email()
                            .openapi({ description: 'Email of the user' }),
                        name: zod_1.default.string().openapi({ description: 'name of the user' }),
                        secondName: zod_1.default
                            .string()
                            .openapi({ description: 'secondName of the user' }),
                        avatar: zod_1.default.string().openapi({ description: 'avatar of the user' }),
                    }),
                },
            },
        },
    },
    responses: {
        200: {
            description: 'user logged in successfully',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.SuccessResponseSchema,
                },
            },
        },
        400: {
            description: 'credentials are not valid',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.ErrorResponseSchema,
                },
            },
        },
    },
    tags: ['authentication'],
});
// get user bu id
exports.registry.registerPath({
    method: 'get',
    path: '/api/v1/user/me',
    description: 'get current user information',
    summary: 'current user info',
    security: [{ cookieAuth: [] }],
    responses: {
        200: {
            description: 'user information retrieved successfully',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.SuccessResponseSchema,
                },
            },
        },
        400: {
            description: 'invalid user ID',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.ErrorResponseSchema,
                },
            },
        },
        401: {
            description: 'Unauthorized user',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.ErrorResponseSchema,
                },
            },
        },
    },
    tags: ['user'],
});
// --- Product routes ---
exports.registry.registerPath({
    method: 'get',
    path: '/api/v1/product',
    description: 'List products with optional title search',
    summary: 'Get all products',
    request: {
        query: Product_schema_1.ProductListQuerySchema,
    },
    responses: {
        200: {
            description: 'Products retrieved successfully',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.SuccessResponseSchema,
                },
            },
        },
        400: {
            description: 'Invalid query parameters',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.ErrorResponseSchema,
                },
            },
        },
    },
    tags: ['product'],
});
exports.registry.registerPath({
    method: 'get',
    path: '/api/v1/product/filter',
    description: 'Filter products by color, size, fabric and optional sort',
    summary: 'Filter products',
    request: {
        query: Product_schema_1.ProductFilterQuerySchema,
    },
    responses: {
        200: {
            description: 'Filtered products retrieved successfully',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.SuccessResponseSchema,
                },
            },
        },
        400: {
            description: 'Invalid filter parameters',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.ErrorResponseSchema,
                },
            },
        },
    },
    tags: ['product'],
});
exports.registry.registerPath({
    method: 'post',
    path: '/api/v1/product',
    description: 'Create a new product (admin only)',
    summary: 'Add product',
    security: [{ cookieAuth: [] }],
    request: {
        body: {
            content: {
                'application/json': {
                    schema: Product_schema_1.ProductZodSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: 'Product created successfully',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.SuccessResponseSchema,
                },
            },
        },
        400: {
            description: 'Validation error or invalid data',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.ErrorResponseSchema,
                },
            },
        },
        401: {
            description: 'Unauthorized — admin login required',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.ErrorResponseSchema,
                },
            },
        },
    },
    tags: ['product'],
});
exports.registry.registerPath({
    method: 'put',
    path: '/api/v1/product/{id}',
    description: 'Update an existing product by id (admin only)',
    summary: 'Update product',
    security: [{ cookieAuth: [] }],
    request: {
        params: Params_schema_1.ParamsSchema,
        body: {
            content: {
                'application/json': {
                    schema: Product_schema_1.ProductZodSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: 'Product updated successfully',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.SuccessResponseSchema,
                },
            },
        },
        400: {
            description: 'Validation error or product not found',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.ErrorResponseSchema,
                },
            },
        },
        401: {
            description: 'Unauthorized — admin login required',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.ErrorResponseSchema,
                },
            },
        },
    },
    tags: ['product'],
});
exports.registry.registerPath({
    method: 'delete',
    path: '/api/v1/product/{id}',
    description: 'Delete a product by id (admin only)',
    summary: 'Delete product',
    security: [{ cookieAuth: [] }],
    request: {
        params: Params_schema_1.ParamsSchema,
    },
    responses: {
        200: {
            description: 'Product deleted successfully',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.SuccessResponseSchema,
                },
            },
        },
        400: {
            description: 'Product not found or invalid id',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.ErrorResponseSchema,
                },
            },
        },
        401: {
            description: 'Unauthorized — admin login required',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.ErrorResponseSchema,
                },
            },
        },
    },
    tags: ['product'],
});
exports.registry.registerPath({
    method: 'post',
    path: '/api/v1/product/upload',
    description: 'Upload a product image file to the server (admin only)',
    summary: 'Upload product image',
    security: [{ cookieAuth: [] }],
    request: {
        body: {
            content: {
                'multipart/form-data': {
                    schema: Product_schema_1.ProductUploadSchema,
                },
            },
        },
    },
    responses: {
        201: {
            description: 'Image uploaded successfully',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.SuccessResponseSchema,
                },
            },
        },
        400: {
            description: 'No file uploaded or invalid file',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.ErrorResponseSchema,
                },
            },
        },
        401: {
            description: 'Unauthorized — admin login required',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.ErrorResponseSchema,
                },
            },
        },
    },
    tags: ['product'],
});
// --- Stripe routes ---
exports.registry.registerPath({
    method: 'post',
    path: '/api/v1/stripe/create-checkout-session',
    description: 'Create a Stripe Checkout session from cart items. Requires Origin header for redirect URLs.',
    summary: 'Create checkout session',
    security: [{ cookieAuth: [] }],
    request: {
        body: {
            content: {
                'application/json': {
                    schema: stripe_schema_1.CreateCheckoutSessionSchema,
                },
            },
        },
        headers: zod_1.default.object({
            origin: zod_1.default.string().url().openapi({
                description: 'Frontend origin used for Stripe success/cancel URLs',
                example: 'http://localhost:3000',
            }),
        }),
    },
    responses: {
        200: {
            description: 'Checkout session created; returns Stripe URL and order id',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.SuccessResponseSchema,
                },
            },
        },
        400: {
            description: 'Empty cart or missing Origin header',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.ErrorResponseSchema,
                },
            },
        },
        401: {
            description: 'Unauthorized user',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.ErrorResponseSchema,
                },
            },
        },
        500: {
            description: 'Stripe not configured',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.ErrorResponseSchema,
                },
            },
        },
    },
    tags: ['stripe'],
});
exports.registry.registerPath({
    method: 'post',
    path: '/api/v1/stripe/order-status',
    description: 'Update ShoppingCart order status after payment (completed or cancelled)',
    summary: 'Update order status',
    security: [{ cookieAuth: [] }],
    request: {
        body: {
            content: {
                'application/json': {
                    schema: stripe_schema_1.UpdateOrderStatusSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: 'Order status updated successfully',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.SuccessResponseSchema,
                },
            },
        },
        400: {
            description: 'Missing or invalid order_id or success flag',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.ErrorResponseSchema,
                },
            },
        },
        401: {
            description: 'Unauthorized user',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.ErrorResponseSchema,
                },
            },
        },
        404: {
            description: 'Order not found',
            content: {
                'application/json': {
                    schema: ResponseSchema_1.ErrorResponseSchema,
                },
            },
        },
    },
    tags: ['stripe'],
});
// Generate OpenAPI specification
const generator = new zod_to_openapi_1.OpenApiGeneratorV3(exports.registry.definitions);
const openApiSpec = generator.generateDocument(options);
const router = (0, express_1.default)();
// Setup Swagger UI
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));
exports.default = router;
