import { createClient } from '@/lib/supabase/server'
import { SupabaseClient } from '@supabase/supabase-js'
import { cache } from 'react'

/**
 * Get the current user from the Supabase server client
 * @param supabase - The Supabase **server** client instance
 * @returns The current user if found, null otherwise
 */
export async function getCurrentUser(supabase: SupabaseClient) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error('Error fetching current user:', error)
    return null
  }
}

/**
 * Used with **server components only** (or their queries, actions, etc)
 *
 * Get the current user from the Supabase server client
 * Caches the result to prevent multiple requests
 * @returns The current user if found, null otherwise
 */
export const getCachedCurrentUser = cache(async () => {
  const supabase = await createClient() // Instantiated inside
  return getCurrentUser(supabase)
})