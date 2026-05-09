'use server'

import { signIn } from '@/lib/auth/server'
import { signinSchema } from '@repo/validation'
import { redirect } from 'next/navigation'

type AuthResult = {
  success?: boolean
  error?: string | null
}

export async function handleSignin(prevState: AuthResult, formData: FormData) {
  const rawData = Object.fromEntries(formData)

  const validated = signinSchema.safeParse(rawData)

  if (!validated.success) {
    const errorMessage =
      validated.error.issues[0]?.message || 'Invalid form data'
    return { success: false, error: errorMessage }
  }

  const { email, password } = validated.data

  const result = await signIn(email, password)

  if (!result.success) {
    return { success: false, error: result.error || 'Signin failed' }
  }

  redirect('/dashboard')
}
