import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

extendZodWithOpenApi(z)

const LoginSchema = z.object({
  email: z.string().email().openapi({ description: 'Email of the user' }),
  password: z.string().openapi({ description: 'Password of the user' }),
})

type Tlogin = z.infer<typeof LoginSchema>;

export { Tlogin, LoginSchema }
