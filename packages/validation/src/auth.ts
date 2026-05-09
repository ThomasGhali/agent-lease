import { z } from 'zod'

export const signinSchema = z.object({
  email: z.email({ error: 'invalid email' }),
  password: z.string().min(6, { error: 'Password must be at least 6 chars' }),
})

export const signupSchema = z
  .object({
    name: z.string().regex(/^[a-zA-Z]{2,} [a-zA-Z]{2,}$/, {
      error:
        'Full name includes first, then last name. Each are at least 2 chars',
    }),
    email: z.email({ error: 'invalid email' }),
    password: z.string().min(6, { error: 'Password must be at least 6 chars' }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    error: 'Passwords do not match',
    path: ['confirmPassword'],
  })
