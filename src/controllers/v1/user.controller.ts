import { Request, Response } from 'express';
import { sendError, sendSuccess } from '../../services/helpers';
import { User } from '../../modules/user.module';
import bcrypt from 'bcrypt';

export async function currentUser(req: Request, res: Response) {
    try {
        const userId = req.userId;
        if (!userId)
            return sendError(
                res,
                {
                    success: false,
                    message: 'Unauthorized user',
                },
                401
            );
        const user = await User.findById(userId, { password: 0, __v: 0 });
        return sendSuccess(res, 200, {
            success: true,
            message: 'This is the user profile',
            data: user,
        });
    } catch (err) {
        return sendError(res, {
            success: false,
            message: 'somthing Wrong!!',
        });
    }
}

export async function restPassword(req: Request, res: Response) {
    try {
        const { password, newPassword, confirmPassword } = req.body;
        const userId = req.userId;
        if (!userId)
            return sendError(
                res,
                {
                    success: false,
                    message: 'Unauthorized user',
                },
                401
            );
        const user = await User.findById(userId).select('password');
        if (!user)
            return sendError(
                res,
                {
                    success: false,
                    message: 'Unauthorized user',
                },
                401
            );
        const userExist = await User.findById(userId).select('password');
        if (!userExist)
            return sendError(
                res,
                {
                    success: false,
                    message: 'Unauthorized user',
                },
                401
            );
        const validPassword = await bcrypt.compareSync(password, userExist?.password!);
        if (!validPassword) {
            return sendError(res, {
                success: false,
                message: 'password is not correct',
            });
        }

        const hashPassowrd = await bcrypt.hash(newPassword, 10);
        if (!hashPassowrd) {
            return sendError(res, {
                success: false,
                message: 'somthing Wrong!!',
            });
        }

        const UpdateUser = await User.findByIdAndUpdate(userId, {
            password: hashPassowrd,
        });

        return sendSuccess(res, 201, {
            success: true,
            message: 'password is updated successfully',
        });
    } catch (err) {
        return sendError(res, {
            success: false,
            message: 'somthing Wrong!!',
        });
    }
}
