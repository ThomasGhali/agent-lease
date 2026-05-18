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
