import { getCachedAgents } from '@/features/my-agents/utils'
import { getCachedCurrentUser } from '@/lib/supabase/user'

export const getMyAgentsData = async () => {
  const user = await getCachedCurrentUser()

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
