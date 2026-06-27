import { db } from '@repo/db'
import { unstable_cache } from 'next/cache'

/**
 * Caches the user's agents for 5 hours.
 * @param userId The ID of the user.
 * @returns The user's agents.
 */
export const getCachedAgents = (userId: string) =>
  unstable_cache(
    async () => {
      return db.agent.findMany({
        where: {
          userId,
        },
      })
    },
    [`user-agents-${userId}`],
    {
      tags: [`user-agents-${userId}`],
      revalidate: 60 * 60 * 5,
    },
  )()

/**
 * Caches a single agent by its ID for 5 hours.
 * @param agentId The ID of the agent.
 * @returns The agent, or null if not found.
 */
export const getCachedAgent = (agentId: string) =>
  unstable_cache(
    async () => {
      return db.agent.findUnique({
        where: {
          id: agentId,
        },
      })
    },
    [`agent-${agentId}`],
    {
      tags: [`agent-${agentId}`],
      revalidate: 60 * 60 * 5,
    },
  )()
