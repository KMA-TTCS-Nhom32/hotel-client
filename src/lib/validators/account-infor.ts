import { z } from 'zod';

export const accountInforSchema = z.object({
  name: z.string({
    required_error: 'auth.required.name',
  }).min(3, {
    message: 'auth.validate.name_min_length',
  }).max(255, {
    message: 'auth.validate.name_max_length',
  }),
  birthDate: z.date({
    required_error: 'auth.required.birth_date',
  }).refine(value => {
    const age = new Date().getFullYear() - new Date(value).getFullYear();
    return age >= 18;
  }, {
    message: 'auth.validate.age',
  }),
  gender: z.enum(['male', 'female'], {
    message: 'auth.valid.gender',
  }),
  email: z.string({
    required_error: 'auth.required.email',
  }),
  phone: z.string({
    required_error: 'auth.required.phone',
  }),
});

export type AccountInforValues = z.infer<typeof accountInforSchema>;