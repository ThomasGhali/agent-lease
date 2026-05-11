import { AppSidebar } from '@/features/dashboard-layout/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import DashboardBreadCrumb from '@/features/dashboard-layout/components/dashboard-bread-crumb'

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardBreadCrumb />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
