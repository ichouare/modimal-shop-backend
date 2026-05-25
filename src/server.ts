import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import AllRouter from '../src/routes/v1/index'
import connectdb from './config/connectdb'
import { errorHandler } from './middleware/errorHandler'

import { envSchema } from './services/validateEnvFile'

const app = express()

// middlewares
app.use(express.json())
app.use(compression())
app.set('query parser', 'extended') // add this line to parser query string if we have embbding data
app.use(express.urlencoded({ extended: true }))

app.use(
  cors({
    credentials: true, // Allow sending cookies
    origin: process.env.FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
)

app.use(cookieParser()) // parser cookies
try {
  const result = envSchema.safeParse(process.env)

  if (!result.success) {
    console.error('Invalid environment variables:')
    console.error(result.error.format())
    process.exit(1)
  }

  connectdb()

  app.use('/api/v1', AllRouter)

  app.use(errorHandler)

  app.listen(process.env.PORT, () => {
    console.log('server listen to PORT', process.env.PORT)
  })
} catch (e: any) {
  console.log('server stop runing withi error', e?.message!)
  process.exit(1)
}
