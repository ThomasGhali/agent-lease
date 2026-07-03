'use server'

import { User } from '@supabase/supabase-js'
import { z } from 'zod'

import { db } from '@repo/db'
import { createAgentFormSchema } from '@repo/validation'

import { FormState } from '@/features/create-agent-form/components/types'
import { getAgentsCount } from '@/lib/prisma/agents-count'
import { getCachedCurrentUser } from '@/lib/supabase/user'
import { redirect } from 'next/navigation'
import { redis } from '@/lib/redis/redis'
import { PLAN_LIMITS, PlanType } from '@repo/common'
import { createAdminClient } from '@/lib/supabase/admin'
import { updateTag } from 'next/cache'

export const submitCreateAgentAction = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  try {
    if (!(formData instanceof FormData)) {
      return {
        success: false,
        error: 'Invalid form data submission.',
        message: null,
      }
    }

    // Authentication and Authorization
    const user = await getCachedCurrentUser()
    if (!user) {
      return {
        success: false,
        error: 'Unauthorized. Please sign in to create an agent.',
        message: null,
      }
    }

    const userPlan = await ensureUserPlan(user)

    const limitError = await validateAgentLimit(user.id, userPlan)
    if (limitError) return limitError

    // Schema Validation
    const rawFormData = Object.fromEntries(formData)
    const result = createAgentFormSchema.safeParse(rawFormData)

    if (!result.success) {
      return {
        success: false,
        error: 'Validation failed.',
        fieldErrors: z.flattenError(result.error).fieldErrors,
        message: null,
      }
    }

    const validatedData = result.data

    const hostname = normalizeDomain(validatedData.hostname)

    const newAgent = await db.agent.create({
      data: {
        userId: user.id,
        name: validatedData.agentName,
        agentRole: validatedData.agentRole,
        isActive: Boolean(validatedData.isActive),
        hostname,
        systemPrompt: validatedData.systemPrompt,
        welcomeMessage: validatedData.welcomeMessage,
        fallbackMessage: validatedData.fallbackMessage,
        themeColor: validatedData.themeColor,
      },
    })

    await redis.set(`agent:${newAgent.id}:owner`, user.id)

    updateTag(`user-agents-${user.id}`)
    updateTag(`user-stats-${user.id}`)

    return {
      success: true,
      agentId: newAgent.id,
      message: 'Agent created successfully!',
      error: null,
    }
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? `Error at submitCreateAgentAction: ${err.message}`
        : 'An unexpected error occurred. Please try again.'

    return {
      success: false,
      error: errorMessage,
      message: null,
    }
  }
}

/**
 * Ensures the user has a valid plan set in their app_metadata (defaults to 'free').
 */
async function ensureUserPlan(user: User): Promise<PlanType> {
  const supabase = createAdminClient()
  const plan: PlanType = user.app_metadata.plan
  const role = user.app_metadata.role

  if (!plan && role !== 'admin') {
    await supabase.auth.admin.updateUserById(user.id, {
      app_metadata: {
        role: 'user',
        plan: PlanType.FREE,
      },
    })
    return PlanType.FREE
  }
  return plan || PlanType.FREE
}

/**
 * Validates whether the user is allowed to create another agent based on their active plan.
 */
async function validateAgentLimit(
  userId: string,
  plan: PlanType,
): Promise<FormState | null> {
  const { count, error } = await getAgentsCount(userId)

  if (error || count === null) {
    return {
      success: false,
      error: 'Failed to verify active agent count.',
      message: null,
    }
  }

  const limit = PLAN_LIMITS[plan].agentsLimit
  if (limit !== undefined && count >= limit) {
    console.error(
      `You have reached the limit of ${limit} agent(s) for your ${plan} plan.`,
    )

    return {
      success: false,
      error: `You have reached the limit of ${limit} agent(s) for your ${plan} plan.`,
      message: null,
    }
  }

  return null
}

function normalizeDomain(value: string) {
  return value
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .split('/')[0]!
    .toLowerCase()
}
