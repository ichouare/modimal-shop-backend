import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { sendError } from '../services/helpers'
import { TokenPayload } from '../services/generateToken'

export async function authenticationHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const JWT_SECRET = process.env.JWT_SECRET

    if (!JWT_SECRET) {
      return sendError(res, {
        success: false,
        message: 'JWT secret missing',
      })
    }

    const token = req.cookies?.accessToken

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided',
      })
    }

    const decoded = jwt.verify(
      req.cookies.accessToken,
      JWT_SECRET
    ) as TokenPayload

    if (!decoded?.userId) {
      return sendError(res, {
        success: false,
        message: 'Invalid token payload',
      })
    }
    if (!decoded?.role) {
      return sendError(
        res,
        {
          success: false,
          message: 'Unauthorized user',
        },
        401
      )
    }

    req.userId = decoded.userId

    next()
  } catch (err) {
    if (err instanceof Error) {
      return sendError(res, {
        success: false,
        message: err.message,
      })
    }

    return sendError(
      res,
      {
        success: false,
        message: 'Authentication failed',
      },
      401
    )
  }
}
