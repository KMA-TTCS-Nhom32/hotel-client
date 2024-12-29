import { z } from 'zod';
import { RegexValidation } from './auth';

export const bookingSchema = z.object({
  email: z
    .string({
      required_error: 'required.email',
    })
    .email({
      message: 'validate.email',
    }),
  phone: z
    .string({
      required_error: 'required.phone',
    })
    .regex(RegexValidation.phone, {
      message: 'validate.phone',
    }),
  special_requests: z
    .string()
    .min(10, {
      message: 'validate.special_requests',
    })
    .optional(),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;