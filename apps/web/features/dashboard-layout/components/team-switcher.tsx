import * as React from 'react'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { TeamInfo } from '@/features/dashboard-layout/types'

export function TeamSwitcher({ team }: { team: TeamInfo }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="cursor-default hover:bg-transparent"
        >
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            {team.logo}
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{team.name}</span>
            <span className="text-muted-foreground truncate text-xs">
              {team.plan}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
