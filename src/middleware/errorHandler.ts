import { Request, Response } from 'express'

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
) {
  console.error('❌ Error:', err)

  const status = err.status || 500

  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
  })
}
