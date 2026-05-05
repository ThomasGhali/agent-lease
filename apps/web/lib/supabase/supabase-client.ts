import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// create new client every API call or proxy request
export const createAuthClient = () =>
  createBrowserClient(supabaseUrl!, supabaseKey!)
