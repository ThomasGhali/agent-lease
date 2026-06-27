import { AppSidebar } from '@/features/dashboard-layout/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import DashboardBreadCrumb from '@/features/dashboard-layout/components/dashboard-bread-crumb'
import { getCachedCurrentUser } from '@/lib/supabase/user'

import { User } from '@supabase/supabase-js'

export default async function Dashboard({
  children,
}: {
  children: React.ReactNode
}) {
  const user = (await getCachedCurrentUser()) as User | null

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
