import {
  redirectIfAuthenticated,
  authGuard,
  adminOnlyGuard,
} from '@/lib/auth/guards'
import { SupabaseUserData } from '@/lib/auth/types'
import { updateSession } from '@/lib/supabase/proxy'
import { type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  const { supabaseResponse, supabase } = await updateSession(request)

  const {
    data: { user },
  } = (await supabase.auth.getUser()) as SupabaseUserData

  const guardResponse =
    authGuard(request, user) ??
    redirectIfAuthenticated(request, user) ??
    adminOnlyGuard(request, user)

  return guardResponse ?? supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|devtools\\.json)$).*)',
  ],
}
