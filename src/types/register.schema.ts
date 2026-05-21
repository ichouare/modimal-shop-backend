import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
export type Tmessage = {
    success: Boolean;
    message: string;
    data?: any;
    errors?: string;
};

extendZodWithOpenApi(z);

export const TSchema = z.object({
    firstName: z.string().openapi({ description: 'firstName of the user' }),
    secondName: z.string().openapi({ description: 'secondName of the user' }),
    email: z.string().email().openapi({ description: 'email of the user' }),
    password: z.string().openapi({ description: 'password of the user' }).optional(),
    avatar: z.string().openapi({ description: 'avatar of the user' }).optional(),
});

export type Tuser = z.infer<typeof TSchema>;
