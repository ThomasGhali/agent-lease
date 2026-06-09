import { AppSidebar } from '@/features/dashboard-layout/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import DashboardBreadCrumb from '@/features/dashboard-layout/components/dashboard-bread-crumb'
import { getCurrentUser } from '@/lib/supabase/user'

import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'

export default async function Dashboard({
  children,
}: {
  children: React.ReactNode
}) {
  const supabaseClient = await createClient()
  const user = (await getCurrentUser(supabaseClient)) as User | null

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" user={user} />
      <SidebarInset>
        <DashboardBreadCrumb />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
