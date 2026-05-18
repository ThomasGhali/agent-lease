import { db } from '@repo/db'

/**
 * Get the number of agents a user has.
 * @returns Object with count and error.
 */
export const getAgentsCount = async (userId: string) => {
  try {
    const count = await db.agent.count({
      where: {
        userId,
      },
    })
    return { count, error: null }
  } catch (error) {
    console.error('Error getting agents count:', error)
    return { count: null, error }
  }
}