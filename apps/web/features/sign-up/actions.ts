'use server'

import { signUp } from '@/lib/auth/server'
import { signupSchema } from '@repo/validation'
import { redirect } from 'next/navigation'

type AuthResult = {
  success?: boolean
  error?: string | null
}

export const handleSignup = async (
  prevState: AuthResult,
  formData: FormData,
) => {
  const rawData = Object.fromEntries(formData)

  const validated = signupSchema.safeParse(rawData)

  if (!validated.success) {
    const errorMessage =
      validated.error.issues[0]?.message || 'Invalid form data'
    return { success: false, error: errorMessage }
  }

  const { username, email, password } = validated.data

  const result = await signUp(email, password, username)

  if (!result.success) {
    return { success: false, error: result.error || 'Signup failed' }
  }

  redirect('/dashboard')
}
