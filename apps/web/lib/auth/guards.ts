import { User } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'

const PROTECTED_ROUTES = ['/dashboard'] as const
const ADMIN_ROUTES = ['/dashboard/admin'] as const

export function authGuard(
  request: NextRequest,
  user: User | null,
): NextResponse | null {
  const isProtected = PROTECTED_ROUTES.some(route =>
    request.nextUrl.pathname.startsWith(route),
  )

  if (!isProtected) return null

  if (!user) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return null
}

export function redirectIfAuthenticated(
  request: NextRequest,
  user: User | null,
) {
  const isSigninRoute = request.nextUrl.pathname.startsWith('/sign-in')

  if (!isSigninRoute) return null

  if (user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return null
}

export function adminOnlyGuard(
  request: NextRequest,
  user: User | null,
): NextResponse | null {
  const isAdminOnly = ADMIN_ROUTES.some(route =>
    request.nextUrl.pathname.startsWith(route),
  )

  if (!isAdminOnly) return null

  if (!user) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  if (user.app_metadata.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return null
}
