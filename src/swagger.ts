import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { OpenAPIObjectConfig } from '@asteasolutions/zod-to-openapi/dist/v3.0/openapi-generator';
import Router, { Request, Response } from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
const swaggerUi = require('swagger-ui-express');



// Generate OpenAPI specification
const options : OpenAPIObjectConfig = {
    openapi: "3.0.0",
    info: {
      title: "e-commerce api",
      version: "1.0.0",
      description: "Scalable E-commerce  Backend Architecture "
    },
    servers: [
      {
        url: "http://localhost:5001",
      },
    ],
}

// const swaggerSpec = swaggerJSDoc(options)

export const registry = new OpenAPIRegistry();

// Register all paths here BEFORE generating the spec
import z, { success } from 'zod';
import { userSchema } from './types/user.schema';
import { LoginSchema } from './types/login.schema';
import { TSchema } from './types/register.schema';
import { ErrorResponseSchema, SuccessResponseSchema } from './types/ResponseSchema';


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
          schema:LoginSchema,
        },
      },
    }
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
});


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
            email: z.string().email().openapi({ description: 'Email of the user' }),
            password: z.string().openapi({ description: 'Password of the user' }),
          }),
        },
      },
    }
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
});


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
    }
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
});

// auth0 register

registry.registerPath({
  method: 'post',
  path: '/api/v1/auth/auth0',
  description: 'login as user',
  summary: 'login',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            email: z.string().email().openapi({ description: 'Email of the user' }),
            name: z.string().openapi({ description: 'name of the user' }),
            secondName: z.string().openapi({ description: 'secondName of the user' }),
            avatar: z.string().openapi({ description: 'avatar of the user' }),
          }),
        },
      },
    }
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
});






// Generate OpenAPI specification
const generator = new OpenApiGeneratorV3(registry.definitions);

const openApiSpec = generator.generateDocument(options);
const router = Router()


// Setup Swagger UI
router.use("/api-docs", swaggerUi.serve,  swaggerUi.setup(openApiSpec))

export default router







