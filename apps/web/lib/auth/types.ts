import { User } from '@supabase/supabase-js'

export type SupabaseUserData = {
  data: {
    user: User | null
  }
}
