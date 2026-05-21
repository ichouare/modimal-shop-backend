import z from 'zod';

export const SuccessResponseSchema = z.object({
    success: z.boolean().openapi({ description: 'Indicates if the operation was successful' }),
    message: z
        .string()
        .openapi({ description: 'A message describing the result of the operation' }),
    data: z.any().optional().openapi({ description: 'Optional data returned from the operation' }),
    errors: z
        .string()
        .optional()
        .openapi({ description: 'Optional error messages if the operation failed' }),
});

export type Tmessage = z.infer<typeof SuccessResponseSchema>;

export const ErrorResponseSchema = z.object({
    success: z.boolean().openapi({ description: 'Indicates if the operation was successful' }),
    message: z
        .string()
        .openapi({ description: 'A message describing the result of the operation' }),
    errors: z
        .string()
        .optional()
        .openapi({ description: 'Optional error messages if the operation failed' }),
});

export type Terror = z.infer<typeof ErrorResponseSchema>;
