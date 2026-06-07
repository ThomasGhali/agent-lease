import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { redis } from '@/lib/redis/redis'
import { PlanType } from '@repo/common'

type AuthResult =
  | { success: true; data: unknown }
  | { success: false; error: string }

export const signIn = async (
  email: string,
  password: string,
): Promise<AuthResult> => {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error('Error at AuthContext/signIn: ', error)
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Unknown error at AuthContext/signIn',
    }
  }
}

export const signUp = async (
  email: string,
  password: string,
  username: string,
): Promise<AuthResult> => {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    })

    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }

    if (!data.user) {
      return {
        success: false,
        error: 'User not created, please contact support.',
      }
    }

    const supabaseAdmin = createAdminClient()

    try {
      const { error: updateError } =
        await supabaseAdmin.auth.admin.updateUserById(data.user.id, {
          app_metadata: {
            role: 'user',
            plan: PlanType.FREE,
          },
        })
      if (updateError) throw updateError
    } catch (metaError) {
      console.error(
        'Non-blocking signup error updating app_metadata:',
        metaError,
      )
    }

    try {
      await redis.hset(`user:${data.user.id}`, {
        plan: PlanType.FREE,
        usage: '0',
        role: 'user',
      })
    } catch (redisError) {
      console.error(
        'Non-blocking signup error updating Redis user cache:',
        redisError,
      )
    }

    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error('Error at AuthContext/signUp: ', error)
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Unknown error at AuthContext/signUp',
    }
  }
}

export const signOut = async (): Promise<AuthResult> => {
  try {
    const supabase = await createClient()

    const { error } = await supabase.auth.signOut()
    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }
    return { success: true, data: null }
  } catch (error) {
    console.error('Error at AuthContext/signOut: ', error)
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Unknown error at AuthContext/signOut',
    }
  }
}
