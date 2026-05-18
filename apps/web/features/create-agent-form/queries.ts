import { SupabaseClient } from '@supabase/supabase-js'

/**
 * Get the number of agents a user has.
 * @param supabase Supabase server client instance.
 * @param userId User ID.
 * @returns Object with count and error.
 */
export const getAgentsCount = async (
  supabase: SupabaseClient,
  userId: string,
) => {
  const { count, error } = await supabase
    .from('agents')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)

  return { count, error }
}
