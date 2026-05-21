import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { sendError } from '../services/helpers';

export async function adminAuthenticationHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const JWT_SECRET = process.env.JWT_SECRET;

        if (!JWT_SECRET) {
            return sendError(res, {
                success: false,
                message: 'JWT secret missing',
            });
        }

        const token = req.cookies?.accessToken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided',
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: 'USER' | 'ADMIN' };

        if (!decoded?.userId) {
            return sendError(res, {
                success: false,
                message: 'Invalid token payload',
            });
        }

        if (decoded?.role !== 'ADMIN') {
            return res.status(401).json({
                success: false,
                message: 'Please logged as admin to make this operation',
            });
        }

        req.userId = decoded.userId;

        next();
    } catch (err) {
        if (err instanceof Error) {
            return sendError(res, {
                success: false,
                message: err.message,
            });
        }

        return sendError(res, {
            success: false,
            message: 'Authentication failed',
        });
    }
}
