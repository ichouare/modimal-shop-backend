import { z } from 'zod';

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

type Tlogin = z.infer<typeof LoginSchema>;

export { Tlogin, LoginSchema };
