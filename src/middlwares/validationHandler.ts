import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { sendError } from '../services/helpers';

export const validate =
    (schema: { body?: ZodSchema; query?: ZodSchema; params?: ZodSchema }) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.body);
            if (schema.body) schema.body.parse(req.body);
            if (schema.query) schema.query.parse(req.query);
            if (schema.params) schema.params.parse(req.params);

            next();
        } catch (error: any) {
            return sendError(res, {
                success: false,
                message: 'Validation error',
                errors: error.errors,
            });
        }
    };
