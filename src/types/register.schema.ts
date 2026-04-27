import { z } from 'zod';
export type Tmessage = {
    success: Boolean;
    message: string;
    data?: any;
    errors?: string;
};

export const TSchema = z.object({
    firstName: z.string(),
    secondName: z.string(),
    email: z.string().email(),
    password: z.string().optional(),
    avatar: z.string().optional(),
});

export type Tuser = z.infer<typeof TSchema>;
