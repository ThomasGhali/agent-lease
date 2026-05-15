import { db } from '@repo/db'
import { SupabaseClient } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'

const PROTECTED_ROUTES = ['/dashboard'] as const

export async function authGuard(
  request: NextRequest,
  supabase: SupabaseClient,
): Promise<NextResponse | null> {
  const isProtected = PROTECTED_ROUTES.some(route =>
    request.nextUrl.pathname.startsWith(route),
  )

  if (!isProtected) return null

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return null
}

export async function redirectIfAuthenticated(
  request: NextRequest,
  supabase: SupabaseClient,
) {
  const isSigninRoute = request.nextUrl.pathname.startsWith('/sign-in')

  if (!isSigninRoute) return null

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return null
}

export async function limitUserAgents(
  request: NextRequest,
  supabase: SupabaseClient,
) {
  const isCreateAgentRoute = request.nextUrl.pathname.startsWith(
    '/dashboard/my-agents/create',
  )

  if (!isCreateAgentRoute) return null

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return NextResponse.redirect(new URL('/sign-in', request.url))

  const { count, error } = await supabase
    .from('agents')
    .select('*', { count: 'exact', head: true })
    .eq('userid', user.id)

  if (error || count === null) {
    throw new Error(
      'Failed to reach the agents creation form, please try again.',
    )
  }

  // free user has max 1 agent
  if (user.app_metadata.plan === 'free' && count >= 1) {
    return NextResponse.redirect(
      new URL('/pricing?reason=limit_reached', request.url),
    )
  }

  // premium user has max 3 agents
  if (user.app_metadata.plan === 'premium' && count >= 3) {
    return NextResponse.redirect(
      new URL('/pricing?reason=limit_reached', request.url),
    )
  }

  // enterprise user has max 10 agents
  if (user.app_metadata.plan === 'enterprise' && count >= 10) {
    return NextResponse.redirect(
      new URL('/dashboard/my-agents?reason=max_limit_reached', request.url),
    )
  }

  return null
}
