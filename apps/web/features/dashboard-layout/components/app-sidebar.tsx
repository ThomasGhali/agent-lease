import * as React from 'react'

import { NavMain } from '@/features/dashboard-layout/components/nav-main'
import { NavProjects } from '@/features/dashboard-layout/components/nav-projects'
import { NavUser } from '@/features/dashboard-layout/components/nav-user'
import { TeamSwitcher } from '@/features/dashboard-layout/components/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

import { data } from '@/features/dashboard-layout/data'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher team={data.team} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
