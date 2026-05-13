import { db } from '@repo/db'
import { unstable_cache } from 'next/cache'

export const getCachedAgents = (userId: string) =>unstable_cache(
    async () => {
      return db.agent.findMany({
        where: {
          userId,
        },
      })
    },
    [`user-agents-${userId}`],
    {
      tags: [`user-agents-${userId}`, 'users-agents', 'global'],
      revalidate: 60 * 60 * 5,
    },
  )()

