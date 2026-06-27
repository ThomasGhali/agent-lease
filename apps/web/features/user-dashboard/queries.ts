import { redis } from '@/lib/redis/redis'
import { getCachedCurrentUser } from '@/lib/supabase/user'
import { PLAN_LIMITS } from '@repo/common'
import { db, PlanType, SenderType } from '@repo/db'
import { User } from '@supabase/supabase-js'
import { unstable_cache } from 'next/cache'

// TODO (PROD): add pagination handling
/**
 * Fetches the current user's dashboard statistics: plan limit, tokens consumed,
 * active plan, and number of active agents.
 *
 * @returns An object with `planLimit`, `tokensConsumed`, `userPlan`, and `userActiveAgents`,
 * or `null` if no authenticated user is found.
 *
 * @example
 * { planLimit: 10000, tokensConsumed: "100", userPlan: "FREE", userActiveAgents: 2 }
 */
export const getUserStatsData = async () => {
  const user: User | null = await getCachedCurrentUser()

  if (!user) {
    console.error('no user found')
    return null
  }

  const userId = user.id
  const userPlan: PlanType = user.app_metadata.plan || PlanType.FREE
  const userRole = user.app_metadata.role || 'user'

  return getCachedUserStats(userId, userPlan, userRole)
}

// TODO (PROD): add pagination handling
/**
 * Fetches the current user's agents data.
 *
 * @returns An array of agents belonging to the current user, including message counts.
 * Returns `undefined` if no user is found or an error occurs.
 *
 * @example
 * [
 *   {
 *     id: 'agent1',
 *     name: 'Agent 1',
 *     description: 'Description 1',
 *     ...otherFields, // all fields in Agent model
 *     _count: { messages: 10 },
 *   },
 * ...
 * ]
 */
export const getAgentsData = async () => {
  const user: User | null = await getCachedCurrentUser()

  if (!user) {
    console.error('no user found')
    return
  }

  const userId = user.id

  try {
    const agentsData = await db.agent.findMany({
      where: {
        userId,
      },
      select: {
        hostname: true,
        name: true,
        agentRole: true,
        isActive: true,
        _count: {
          select: {
            messages: {
              where: {
                sender: SenderType.AI_SUPPORT,
              },
            },
          },
        },
      },
    })

    return agentsData
  } catch (e) {
    console.error(e)
    return null
  }
}

export const getRecentConversations = async () => {
  const user: User | null = await getCachedCurrentUser()

  if (!user) {
    console.error('no user found')
    return null
  }

  const userId = user.id

  try {
    const messages = await db.room.findMany({
      where: {
        agent: { userId },
      },
      orderBy: { updatedAt: 'desc' },
      take: 5,
      select: {
        id: true, // for chat[id] in the future (production)

        agent: {
          select: {
            name: true,
            hostname: true,
          },
        },

        messages: {
          where: { sender: 'VISITOR' },
          orderBy: { createdAt: 'desc' },
          take: 1,
          select: {
            content: true,
            createdAt: true,
          },
        },
      },
    })

    console.log('messages:', messages)

    return messages
  } catch (error) {
    console.error(error)
  }
}

/**
 * Caches the user's statistics for 5 hours.
 * @param userId The ID of the user.
 * @param userPlan The plan of the user.
 * @returns The user's statistics object having planLimit, tokensConsumed & activeAgentCount.
 */
const getCachedUserStats = (
  userId: string,
  userPlan: PlanType,
  userRole: string,
) =>
  unstable_cache(
    async () => {
      const planLimit =
        PLAN_LIMITS[userPlan].tokensLimit ||
        PLAN_LIMITS[PlanType.FREE].tokensLimit

      try {
        const [tokensConsumed, userActiveAgents] = await Promise.all([
          redis.hget(`user:${userId}`, 'usage'),
          db.agent.count({
            where: {
              userId,
              isActive: true,
            },
          }),
        ])

        if (!tokensConsumed) {
          await redis.hset(`user:${userId}`, {
            usage: '0',
            plan: userPlan,
            role: userRole,
          })
        }

        return {
          planLimit,
          tokensConsumed: tokensConsumed ?? '0',
          userPlan,
          userActiveAgents,
        }
      } catch (error) {
        console.error(error)
        return null
      }
    },
    [`user-stats-${userId}-${userPlan}`],
    {
      tags: [`user-stats-${userId}`],
      revalidate: 60 * 60 * 5,
    },
  )()
