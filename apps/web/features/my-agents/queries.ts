import { getCachedAgents } from '@/features/my-agents/utils'
import { getCurrentUser } from '@/lib/supabase/user'



export const getMyAgentsData = async () => {
  const user = await getCurrentUser()

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
