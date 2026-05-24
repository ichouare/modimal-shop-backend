import { z } from 'zod'

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.string().nonempty(),
  URL_DB: z.string().nonempty(),
  JWT_SECRET: z.string().nonempty(),
  SMTP_SERVER_USERNAME: z.string().nonempty(),
  SMTP_SERVER_PASSWORD: z.string().nonempty(),
  STRIPE_SECRET_KEY: z.string().nonempty(),
  UPLOAD_FOLDER: z.string().nonempty(),
  FRONTEND_URL: z.string().nonempty()
})
