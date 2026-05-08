'use server'

import { signIn } from '@/lib/auth/server'
import { signInSchema } from '@repo/validation'

type AuthResult = {
  success?: boolean
  error?: string | null
}

export async function handleLogIn(prevState: AuthResult, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const validated = signInSchema.safeParse({ email, password })

  if (!validated.success) {
    const errorMessage =
      validated.error.issues[0]?.message || 'Invalid form data'
    return { success: false, error: errorMessage }
  }

  return await signIn(email, password)
}
