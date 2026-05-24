import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from '@asteasolutions/zod-to-openapi'
import { OpenAPIObjectConfig } from '@asteasolutions/zod-to-openapi/dist/v3.0/openapi-generator'
import Router from 'express'
const swaggerUi = require('swagger-ui-express')

// Generate OpenAPI specification
const options: OpenAPIObjectConfig = {
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
}

// const swaggerSpec = swaggerJSDoc(options)

export const registry = new OpenAPIRegistry()

registry.registerComponent('securitySchemes', 'cookieAuth', {
  type: 'apiKey',
  in: 'cookie',
  name: 'accessToken',
})

// Register all paths here BEFORE generating the spec
import z from 'zod'
import { LoginSchema } from './types/login.schema'
import { TSchema } from './types/register.schema'
import {
  ErrorResponseSchema,
  SuccessResponseSchema,
} from './types/ResponseSchema'
import { ParamsSchema } from './types/Params.schema'
import {
  ProductFilterQuerySchema,
  ProductListQuerySchema,
  ProductUploadSchema,
  ProductZodSchema,
} from './types/Product.schema'
import {
  CreateCheckoutSessionSchema,
  UpdateOrderStatusSchema,
} from './types/stripe.schema'

//logged as user
registry.registerPath({
  method: 'post',
  path: '/api/v1/auth/user',
  description: 'login as user',
  summary: 'login',
  request: {
    body: {
      content: {
        'application/json': {
          schema: LoginSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'user logged in successfully',
      content: {
        'application/json': {
          schema: SuccessResponseSchema,
        },
      },
    },
    400: {
      description: 'credentials are not valid',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
    },
  },
  tags: ['authentication'],
})

//logged as admin
registry.registerPath({
  method: 'post',
  path: '/api/v1/auth/admin',
  description: 'login as admin',
  summary: 'login',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            email: z
              .string()
              .email()
              .openapi({ description: 'Email of the user' }),
            password: z
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
          schema: SuccessResponseSchema,
        },
      },
    },
    400: {
      description: 'credentials are not valid',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
    },
    401: {
      description: ' Unauthorized user',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
    },
  },
  tags: ['authentication'],
})

// create new user
registry.registerPath({
  method: 'post',
  path: '/api/v1/auth/register',
  description: 'create new user',
  summary: 'add new user',
  request: {
    body: {
      content: {
        'application/json': {
          schema: TSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'user created successfully',
      content: {
        'application/json': {
          schema: SuccessResponseSchema,
        },
      },
    },
    400: {
      description: 'credentials are not valid',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
    },
  },
  tags: ['authentication'],
})

// auth0 register
registry.registerPath({
  method: 'post',
  path: '/api/v1/auth/auth0',
  description: 'login as user',
  summary: 'login',
  security: [{ cookieAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            email: z
              .string()
              .email()
              .openapi({ description: 'Email of the user' }),
            name: z.string().openapi({ description: 'name of the user' }),
            secondName: z
              .string()
              .openapi({ description: 'secondName of the user' }),
            avatar: z.string().openapi({ description: 'avatar of the user' }),
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
          schema: SuccessResponseSchema,
        },
      },
    },
    400: {
      description: 'credentials are not valid',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
    },
  },
  tags: ['authentication'],
})

// get user bu id
registry.registerPath({
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
          schema: SuccessResponseSchema,
        },
      },
    },
    400: {
      description: 'invalid user ID',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
    },
    401: {
      description: 'Unauthorized user',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
    },
  },
  tags: ['user'],
})

// --- Product routes ---

registry.registerPath({
  method: 'get',
  path: '/api/v1/product',
  description: 'List products with optional title search',
  summary: 'Get all products',
  request: {
    query: ProductListQuerySchema,
  },
  responses: {
    200: {
      description: 'Products retrieved successfully',
      content: {
        'application/json': {
          schema: SuccessResponseSchema,
        },
      },
    },
    400: {
      description: 'Invalid query parameters',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
    },
  },
  tags: ['product'],
})

registry.registerPath({
  method: 'get',
  path: '/api/v1/product/filter',
  description: 'Filter products by color, size, fabric and optional sort',
  summary: 'Filter products',
  request: {
    query: ProductFilterQuerySchema,
  },
  responses: {
    200: {
      description: 'Filtered products retrieved successfully',
      content: {
        'application/json': {
          schema: SuccessResponseSchema,
        },
      },
    },
    400: {
      description: 'Invalid filter parameters',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
    },
  },
  tags: ['product'],
})

registry.registerPath({
  method: 'post',
  path: '/api/v1/product',
  description: 'Create a new product (admin only)',
  summary: 'Add product',
  security: [{ cookieAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: ProductZodSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Product created successfully',
      content: {
        'application/json': {
          schema: SuccessResponseSchema,
        },
      },
    },
    400: {
      description: 'Validation error or invalid data',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
    },
    401: {
      description: 'Unauthorized — admin login required',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
    },
  },
  tags: ['product'],
})

registry.registerPath({
  method: 'put',
  path: '/api/v1/product/{id}',
  description: 'Update an existing product by id (admin only)',
  summary: 'Update product',
  security: [{ cookieAuth: [] }],
  request: {
    params: ParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: ProductZodSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Product updated successfully',
      content: {
        'application/json': {
          schema: SuccessResponseSchema,
        },
      },
    },
    400: {
      description: 'Validation error or product not found',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
    },
    401: {
      description: 'Unauthorized — admin login required',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
    },
  },
  tags: ['product'],
})

registry.registerPath({
  method: 'delete',
  path: '/api/v1/product/{id}',
  description: 'Delete a product by id (admin only)',
  summary: 'Delete product',
  security: [{ cookieAuth: [] }],
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      description: 'Product deleted successfully',
      content: {
        'application/json': {
          schema: SuccessResponseSchema,
        },
      },
    },
    400: {
      description: 'Product not found or invalid id',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
    },
    401: {
      description: 'Unauthorized — admin login required',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
    },
  },
  tags: ['product'],
})

registry.registerPath({
  method: 'post',
  path: '/api/v1/product/upload',
  description: 'Upload a product image file to the server (admin only)',
  summary: 'Upload product image',
  security: [{ cookieAuth: [] }],
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: ProductUploadSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Image uploaded successfully',
      content: {
        'application/json': {
          schema: SuccessResponseSchema,
        },
      },
    },
    400: {
      description: 'No file uploaded or invalid file',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
    },
    401: {
      description: 'Unauthorized — admin login required',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
    },
  },
  tags: ['product'],
})

// --- Stripe routes ---

registry.registerPath({
  method: 'post',
  path: '/api/v1/stripe/create-checkout-session',
  description:
    'Create a Stripe Checkout session from cart items. Requires Origin header for redirect URLs.',
  summary: 'Create checkout session',
  security: [{ cookieAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateCheckoutSessionSchema,
        },
      },
    },
    headers: z.object({
      origin: z.string().url().openapi({
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
          schema: SuccessResponseSchema,
        },
      },
    },
    400: {
      description: 'Empty cart or missing Origin header',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
    },
    401: {
      description: 'Unauthorized user',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
    },
    500: {
      description: 'Stripe not configured',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
    },
  },
  tags: ['stripe'],
})

registry.registerPath({
  method: 'post',
  path: '/api/v1/stripe/order-status',
  description:
    'Update ShoppingCart order status after payment (completed or cancelled)',
  summary: 'Update order status',
  security: [{ cookieAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: UpdateOrderStatusSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Order status updated successfully',
      content: {
        'application/json': {
          schema: SuccessResponseSchema,
        },
      },
    },
    400: {
      description: 'Missing or invalid order_id or success flag',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
    },
    401: {
      description: 'Unauthorized user',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
    },
    404: {
      description: 'Order not found',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
    },
  },
  tags: ['stripe'],
})

// Generate OpenAPI specification
const generator = new OpenApiGeneratorV3(registry.definitions)

const openApiSpec = generator.generateDocument(options)
const router = Router()

// Setup Swagger UI
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpec))

export default router
