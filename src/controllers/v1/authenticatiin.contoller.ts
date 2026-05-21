import type { Request, Response } from 'express';
import { sendError, sendSuccess } from '../../services/helpers';
import { User } from '../../modules/user.module';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '../../services/generateToken';
import { setCookies } from '../../services/setCookies';
import { nodeTransporter } from '../../services/transporterMail';

export async function loginAsUser(req: Request, res: Response) {
    try {
        const existUser = await User.findOne({
            email: req.body.email,
        });
        if (!existUser) {
            return sendError(res, {
                success: false,
                message: 'Please make to enter a correct criditienls',
            });
        }

        const validatePassword = await bcrypt.compare(req.body.password, existUser?.password);
        if (!validatePassword) {
            return sendError(res, { success: false, message: 'Invalid credentials' });
        }
        const AccessToken = generateAccessToken({
            userId: existUser?._id?.toString(),
            role: 'USER',
        });
        const RefreshToken = generateRefreshToken({
            userId: existUser?._id?.toString(),
            role: 'USER',
        });
        setCookies(res, AccessToken, RefreshToken);

        return sendSuccess(res, 200, {
            success: true,
            message: "Your're connect succesfully",
        });
    } catch (error: {
        [key: string]: string;
    }) {
        return sendError(res, {
            success: false,
            message: 'Registration failed',
            errors: error?.message,
        });
    }
}

export async function loginAsAdmin(req: Request, res: Response) {
    try {
        const existUser = await User.findOne({
            email: req.body.email,
            role: 'ADMIN',
        });
        if (!existUser) {
            return sendError(
                res,
                {
                    success: false,
                    message: 'Please make to enter a correct criditienls',
                },
                401
            );
        }
        const validatePassowrd = await bcrypt.compare(req.body.password, existUser?.password);
        if (!validatePassowrd) {
            return sendError(res, { success: false, message: 'Invalid credentials' });
        }
        const AccessToken = generateAccessToken({
            userId: existUser?._id?.toString(),
            role: 'ADMIN',
        });
        const RefreshToken = generateRefreshToken({
            userId: existUser?._id?.toString(),
            role: 'ADMIN',
        });
        setCookies(res, AccessToken, RefreshToken);

        return sendSuccess(res, 200, {
            success: true,
            message: "Your're connect succesfully",
        });
    } catch (error: {
        [key: string]: string;
    }) {
        return sendError(res, {
            success: false,
            message: 'Registration failed',
            errors: error?.message,
        });
    }
}

export async function RegisterUser(req: Request, res: Response) {
    try {
        const existUser = await User.findOne({
            $or: [{ email: req.body.email }, { secondName: req.body.secondName }],
        });

        if (existUser) {
            return sendError(res, {
                success: false,
                message: 'user with same cridentails is exist !!',
                errors: 'this user is already exist',
            });
        }

        const user = await User.create({
            ...req.body,
        });

        await nodeTransporter.sendMail({
                from: "issam chouaref <issam.chouaref1998@gmail.com>",
                to: user?.email,
                subject: "Welcome to Your platoforme",
                text: "Welcome to our platform! We're excited to have you on board. If you have any questions or need assistance, feel free to reach out to our support team.\n\nBest regards,\nThe Team",
        })
        return sendSuccess(res, 200, {
            success: true,
            message: 'Your acount is add successfully',
        });
    } catch (error: any) {
        return sendError(res, {
            success: false,
            message: 'Registration failed',
            errors: error?.message || 'Somthing wrong !!',
        });
    }
}

export default async function refreshToken(req: Request, res: Response) {
    const JWT_SECRET = process.env.JWT_SECRET;
    try {
        if (!JWT_SECRET) return;
        const validateToken = jwt.verify(req.cookies.refreshToken, JWT_SECRET);

        if (!validateToken) {
            throw new Error('refresh token is not valide');
        }
        const decodeResult = jwt.decode(req.cookies.refreshToken);
        const AccessToken = generateAccessToken({
            userId: decodeResult?.userId,
            role: decodeResult?.role,
        });
        res.setHeader(
            'Set-Cookie',
            `accessToken=${AccessToken}; HttpOnly; Path=/; Max-Age=900; SameSite=Strict`
        );
        return sendSuccess(res, 200, {
            success: true,
            message: 'Token is valid',
        });
    } catch (error: any) {
        return sendError(res, {
            success: false,
            message: 'Token is not valid',
            errors: error?.message || 'Somthing wrong !!',
        });
    }
}

export async function loggOut(req: Request, res: Response) {
    try {
        res.clearCookie('refreshToken');
        res.clearCookie('accressToken');
        sendSuccess(res, 200, {
            success: true,
            message: 'user is logout successfully',
        });
    } catch (error: any) {
        {
            return sendError(res, {
                success: false,
                message: 'Logout failed',
                errors: error?.message || 'Somthing wrong !!',
            });
        }
    }
}

export async function Auth0Register(req: Request, res: Response) {
    try {
        const { email, name, secondName, avatar } = req.body;

        const user = await User.findOneAndUpdate(
            { email },
            {
                $setOnInsert: {
                    email,
                    name,
                    secondName,
                    avatar,
                    verify: true,
                    authProvider: 'auth0',
                },
            },
            {
                new: true,
                upsert: true,
            }
        );

        const AccessToken = generateAccessToken({
            userId: user._id.toString(),
            role: user.role,
        });

        const RefreshToken = generateRefreshToken({
            userId: user._id.toString(),
            role: user.role,
        });

        setCookies(res, AccessToken, RefreshToken);

        return sendSuccess(res, 200, {
            success: true,
            message: 'User authenticated successfully',
        });
    } catch (error) {
        return sendError(res, {
            success: false,
            message: 'Auth failed',
            errors: error?.message,
        });
    }
}
