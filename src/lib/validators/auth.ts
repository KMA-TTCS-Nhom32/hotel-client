import { z } from 'zod';

export const loginSchema = z.object({
  emailOrPhone: z
    .string({
      required_error: 'auth.required.email_or_phone',
    })
    .refine(
      (value) => {
        // Check if string contains only digits
        const isPhoneNumber = /^\d+$/.test(value.replace('+', ''));
        if (isPhoneNumber) {
          // Validate phone format
          return /^(\+84|0)\d{9,10}$/.test(value);
        } else {
          // Validate email format
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }
      },
      {
        message: 'auth.validate.email_or_phone',
      },
    ),
  password: z
    .string()
    .min(8, { message: 'auth.validate.password_min_length' })
    .regex(/[A-Z]/, { message: 'auth.validate.password_uppercase' })
    .regex(/[a-z]/, { message: 'auth.validate.password_lowercase' })
    .regex(/\d/, { message: 'auth.validate.password_digit' })
    .regex(/[^A-Za-z0-9]/, { message: 'auth.validate.password_special' }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
