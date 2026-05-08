import { createAuthClient } from '../supabase/client'

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
