import { createAuthClient } from '../supabase/client'

const supabase = createAuthClient()

export const getInitialSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error

    return data.session
  } catch (error) {
    console.error('Error at lib/auth/client/getInitialSession: ', error)
  }
}
