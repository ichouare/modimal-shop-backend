import type { Response } from 'express';
import { Tmessage } from '../types/register.schema';

export function sendSuccess(res: Response, status: number = 200, message: Tmessage) {
    return res.status(status).json(message);
}

export function sendError(res: Response, message: Tmessage) {
    return res.status(400).json(message);
}
