import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import z from "zod";
extendZodWithOpenApi(z)
        ;


const ResetPasswordSchema = z.object({
  password: z.string().openapi({description:  " Current password of the user"}),
  newPassword: z.string().openapi({description : " New password for the user"}),
  confirmPassword: z.string().openapi({description : " Confirm the new password for the user"}),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "New password and confirm password must match",
  path: ["confirmPassword"],
});

type TResetPassword = z.infer<typeof ResetPasswordSchema>;

export { TResetPassword, ResetPasswordSchema };