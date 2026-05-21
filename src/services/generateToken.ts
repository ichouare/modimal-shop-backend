import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

type TokenPayload = {
    userId: string;
    role: 'USER' | 'ADMIN';
};

export function generateAccessToken(user: TokenPayload) {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) return;
    if (!JWT_SECRET) return;
    return jwt.sign(user, JWT_SECRET, {
        expiresIn: '15m',
    });
}

export function generateRefreshToken(user: TokenPayload) {
    7;
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) return;
    return jwt.sign(user, JWT_SECRET, {
        expiresIn: '1d',
    });
}
