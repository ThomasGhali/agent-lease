import { z } from 'zod'

export const signInSchema = z.object({
  email: z.email('invalid email'),
  password: z.string().min(6, 'Password must be at least 6 chars'),
})
