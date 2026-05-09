import { createClient } from '@/lib/supabase/server'

type AuthResult =
  | { success: true; data: any }
  | { success: false; error: string }

export const signIn = async (
  email: string,
  password: string,
): Promise<AuthResult> => {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error('Error at AuthContext/signIn: ', error)
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Unknown error at AuthContext/signIn',
    }
  }
}

export const signUp = async (
  email: string,
  password: string,
  username: string,
): Promise<AuthResult> => {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    })

    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error('Error at AuthContext/signUp: ', error)
    return {
      success: false,
      error: 'Something went wrong. Please try again.',
    }
  }
}

export const signOut = async (): Promise<AuthResult> => {
  try {
    const supabase = await createClient()

    const { error } = await supabase.auth.signOut()
    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }
    return { success: true, data: null }
  } catch (error) {
    console.error('Error at AuthContext/signOut: ', error)
    return {
      success: false,
      error: 'Something went wrong.',
    }
  }
}
