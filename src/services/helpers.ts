import type { Response } from 'express'
import { Tmessage } from '../types/register.schema'

export function sendSuccess(
  res: Response,
  status: number = 200,
  message: Tmessage
) {
  return res.status(status).json(message)
}

export function sendError(
  sres: Response,
  message: Tmessage,
  status: number = 400
) {
  return sres.status(status).json(message)
}
