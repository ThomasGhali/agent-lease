import * as React from 'react'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { LogoIcon } from '@/components/ui/Icons'

export function TeamSwitcher({ userPlan }: { userPlan: string }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="cursor-default hover:bg-transparent"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-800 mr-2 shrink-0">
            <LogoIcon className="w-4 h-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Agent Lease</span>
            <span className="text-muted-foreground truncate text-xs capitalize">
              {userPlan}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
