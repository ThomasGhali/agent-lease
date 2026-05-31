'use server'

import { SupabaseClient, User } from '@supabase/supabase-js'
import { z } from 'zod'

import { db } from '@repo/db'
import { createAgentFormSchema } from '@repo/validation'

import { FormState } from '@/features/create-agent-form/components/types'
import { getAgentsCount } from '@/lib/prisma/agents-count'
import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/supabase/user'
import { redirect } from 'next/navigation'

const PLAN_LIMITS: Record<string, number> = {
  free: 1,
  premium: 3,
  enterprise: 10,
}

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
    const supabase = await createClient()
    const user = await getCurrentUser(supabase)
    if (!user) {
      return {
        success: false,
        error: 'Unauthorized. Please sign in to create an agent.',
        message: null,
      }
    }

    const userPlan = await ensureUserPlan(supabase, user)

    const limitError = await validateAgentLimit(user.id, userPlan)
    if (limitError) redirect('/pricing')

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

    await db.agent.create({
      data: {
        userId: user.id,
        name: validatedData.agentName,
        agentRole: validatedData.agentRole,
        isActive: Boolean(validatedData.isActive),
        domain: validatedData.domain,
        systemPrompt: validatedData.systemPrompt,
        welcomeMessage: validatedData.welcomeMessage,
        fallbackMessage: validatedData.fallbackMessage,
        themeColor: validatedData.themeColor,
      },
    })

    return {
      success: true,
      message: 'Agent created successfully!',
      error: null,
    }
  } catch (err) {
    console.error('Unhandled error in submitCreateAgentAction:', err)
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
      message: null,
    }
  }
}

/**
 * Ensures the user has a valid plan set in their app_metadata (defaults to 'free').
 */
async function ensureUserPlan(
  supabase: SupabaseClient,
  user: User,
): Promise<string> {
  const plan = user.app_metadata.plan
  const role = user.app_metadata.role

  if (!plan && role !== 'admin') {
    await supabase.auth.admin.updateUserById(user.id, {
      app_metadata: {
        role: 'user',
        plan: 'free',
      },
    })
    return 'free'
  }
  return plan || 'free'
}

/**
 * Validates whether the user is allowed to create another agent based on their active plan.
 */
async function validateAgentLimit(
  userId: string,
  plan: string,
): Promise<FormState | null> {
  const { count, error } = await getAgentsCount(userId)

  if (error || count === null) {
    return {
      success: false,
      error: 'Failed to verify active agent count.',
      message: null,
    }
  }

  const limit = PLAN_LIMITS[plan]
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
