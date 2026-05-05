import { createAuthClient } from '../supabase/supabase-client'

export const getInitialSession = async () => {
  const supabase = createAuthClient()
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error

    return data.session
  } catch (error) {
    console.error('Error at AuthContext/getInitialState: ', error)
  }
}

export const signIn = async (email: string, password: string) => {
  const supabase = createAuthClient()
  if (supabase === undefined)
    throw new Error('Error at signIn: Supabase client not initialized')

  try {
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
  } catch (error: any) {
    console.error('Error at AuthContext/signIn: ', error)
    return {
      success: false,
      error: error.message,
    }
  }
}
