import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabaseClient: ReturnType<typeof createBrowserClient> | undefined

// create a single instance of the client for the browser
export const createAuthClient = () => {
  if (supabaseClient) return supabaseClient

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY) are missing. Please check your .env file.',
    )
  }

  supabaseClient = createBrowserClient(supabaseUrl, supabaseKey)
  return supabaseClient
}
