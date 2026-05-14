import { redirectIfAuthenticated, authGuard } from '@/lib/auth/guards'
import { updateSession } from '@/lib/supabase/proxy'
import { type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  const { supabaseResponse, supabase } = await updateSession(request)

  const guardResponse =
    (await authGuard(request, supabase)) ??
    (await redirectIfAuthenticated(request, supabase))

  return guardResponse ?? supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|devtools\\.json)$).*)',
  ],
}
