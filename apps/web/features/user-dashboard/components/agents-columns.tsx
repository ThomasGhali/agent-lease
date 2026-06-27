'use client'

import { ColumnDef } from '@tanstack/react-table'
import { AgentsData } from '@/features/user-dashboard/types'
import { Badge } from '@/components/ui/badge'

type AgentType = NonNullable<AgentsData>[number]

export const agentsColumns: ColumnDef<AgentType>[] = [
  {
    accessorKey: 'name',
    header: 'Agent Name',
    cell: ({ row }) => (
      <div className="font-medium text-foreground">{row.original.name}</div>
    ),
  },
  {
    accessorKey: 'agentRole',
    header: 'Role',
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.original.agentRole}</div>
    ),
  },
  {
    accessorKey: 'hostname',
    header: 'Domain',
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.original.hostname}</div>
    ),
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => {
      const isActive = row.original.isActive
      return (
        <Badge variant={isActive ? 'default' : 'secondary'} className={isActive ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 shadow-none border-emerald-500/20' : ''}>
          {isActive ? 'Active' : 'Inactive'}
        </Badge>
      )
    },
  },
  {
    accessorKey: '_count.messages',
    header: 'Messages Sent',
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.original._count.messages.toLocaleString()}</div>
    ),
  },
]
