import { z } from 'zod';

// Định nghĩa lại regex cho mật khẩu như trong schema đăng ký hoặc đăng nhập
export const passwordSchema = z
    .string()
    .min(8, { message: 'Must have at least 8 characters' })
    .regex(/[A-Z]/, { message: 'auth.validate.password_uppercase' })
    .regex(/[a-z]/, { message: 'auth.validate.password_lowercase' })
    .regex(/\d/, { message: 'auth.validate.password_digit' })
    .regex(/[^A-Za-z0-9]/, { message: 'auth.validate.password_special' });

export const changePasswordSchema = z.object({
    currentPassword: z
        .string({
            required_error: 'auth.required.current_password',
        })
        .min(8, { message: 'auth.validate.password_min_length' }),

    newPassword: passwordSchema,

    confirmNewPassword: z.string({
        required_error: 'auth.required.confirm_new_password',
    })
        .min(8, { message: 'auth.validate.password_min_length' }),
})
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: 'auth.validate.password_match',
        path: ['confirmNewPassword'],
    });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
