'use client'

import { Separator } from '@/components/ui/separator'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { ProjectByRole } from '@/features/dashboard-layout/types'
import { Session } from '@supabase/supabase-js'
import { MoreHorizontalIcon } from 'lucide-react'
import React from 'react'

export function NavProjects({
  projects,
  isAdmin,
}: {
  projects: ProjectByRole[]
  isAdmin: boolean
}) {
  let processedProjects: ProjectByRole[] = projects

  if (!isAdmin) {
    processedProjects = projects.filter(project => project.role === 'user')
  }

  return (
    <>
      {processedProjects.map(project => (
        <React.Fragment key={project.title}>
          <Separator className="bg-sidebar-border mx-2 w-auto!" />
          <SidebarGroup>
            <SidebarGroupLabel>{project.title}</SidebarGroupLabel>
            <SidebarMenu>
              {project.options.map(item => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild tooltip={item.name}>
                    <a href={item.url}>
                      {item.icon}
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="More"
                  className="text-sidebar-foreground/70"
                >
                  <MoreHorizontalIcon className="text-sidebar-foreground/70" />
                  <span>More</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </React.Fragment>
      ))}
    </>
  )
}
