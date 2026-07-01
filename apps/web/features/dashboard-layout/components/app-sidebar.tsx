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
import { User } from '@supabase/supabase-js'
import { UserInfo } from '@/features/dashboard-layout/types'
import { capitalizeWords } from '@/lib/utils'

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: User | null
}

export function AppSidebar({ ...props }: AppSidebarProps) {
  const user = props.user
  const username = user?.user_metadata.username || 'Unknown User'
  const userEmail = user?.email

  let avatarUrl = ''

  if (userEmail) {
    avatarUrl = `https://api.dicebear.com/9.x/identicon/svg?seed=${encodeURIComponent(userEmail)}`
  }

  const userData: UserInfo = {
    name: username,
    email: user?.email || '',
    avatar: avatarUrl || '/avatars/default.png',
  }

  const isAdmin = user?.app_metadata?.role === 'admin'
  const userPlan = user?.app_metadata?.plan?.toLowerCase() || 'Free'

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher userPlan={userPlan} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} isAdmin={isAdmin} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
