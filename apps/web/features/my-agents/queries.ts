import { getCachedAgents } from '@/features/my-agents/utils'
import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/supabase/user'



export const getMyAgentsData = async () => {
  const supabase = await createClient()
  const user = await getCurrentUser(supabase)

  if (!user) {
    return {
      success: false,
      error: 'Unauthorized',
    }
  }

  const data = await getCachedAgents(user.id)

  return {
    success: true,
    data,
  }
}
