import jwt from 'jsonwebtoken'

export const enum Role {
  'USER' = 'USER',
  'ADMIN' = 'ADMIN',
}

export type TokenPayload = {
  userId: string;
  role: Role;
};

export function generateAccessToken(user: TokenPayload) {
  const JWT_SECRET = process.env.JWT_SECRET
  if (!JWT_SECRET) return
  return jwt.sign(user, JWT_SECRET, {
    expiresIn: '15m',
  })
}

export function generateRefreshToken(user: TokenPayload) {
  const JWT_SECRET = process.env.JWT_SECRET
  if (!JWT_SECRET) return
  return jwt.sign(user, JWT_SECRET, {
    expiresIn: '1d',
  })
}
