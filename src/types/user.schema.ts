import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

extendZodWithOpenApi(z)

export const userSchema = z.object({
  firstName: z.string().openapi({ description: 'firstName of the user' }),
  secondName: z.string().openapi({ description: 'secondName of the user' }),
  email: z.string().openapi({ description: 'email of the user' }),
  password: z.string().openapi({ description: 'password of the user' }),
  authProvider: z
    .enum(['local', 'auth0'])
    .openapi({ description: 'auth provider of the user' }),
  verify: z.boolean().openapi({ description: 'verify of the user' }),
  updatedAt: z.date().openapi({ description: 'updatedAt of the user' }),
  loginAt: z.date().openapi({ description: 'loginAt of the user' }),
  role: z.enum(['USER', 'ADMIN']).openapi({ description: 'role of the user' }),
  avatar: z.string().openapi({ description: 'avatar of the user' }),
  favoritsProduct: z
    .array(z.string())
    .openapi({ description: 'favoritsProduct of the user' }),
  pymemtId: z.string().openapi({ description: 'pymemtId of the user' }),
  shoppingCartId: z
    .string()
    .openapi({ description: 'shoppingCartId of the user' }),
})

export type CreateUser = z.infer<typeof userSchema>;
