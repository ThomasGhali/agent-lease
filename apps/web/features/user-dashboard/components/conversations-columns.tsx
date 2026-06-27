'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ConversationsData } from '@/features/user-dashboard/types'
import { formatDistanceToNow } from 'date-fns'

type ConversationType = NonNullable<ConversationsData>[number]

export const conversationsColumns: ColumnDef<ConversationType>[] = [
  {
    accessorKey: 'agent.name',
    header: 'Agent',
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium text-foreground">{row.original.agent.name}</span>
        <span className="text-xs text-muted-foreground">{row.original.agent.hostname}</span>
      </div>
    ),
  },
  {
    id: 'lastMessage',
    header: 'Last Message',
    cell: ({ row }) => {
      const lastMessage = row.original.messages[0]
      if (!lastMessage) {
        return <div className="text-muted-foreground italic">No messages yet</div>
      }
      return (
        <div className="max-w-[300px] truncate text-foreground" title={lastMessage.content}>
          {lastMessage.content}
        </div>
      )
    },
  },
  {
    id: 'time',
    header: 'Time',
    cell: ({ row }) => {
      const lastMessage = row.original.messages[0]
      if (!lastMessage) return <span className="text-muted-foreground">-</span>
      
      return (
        <div className="text-muted-foreground whitespace-nowrap">
          {formatDistanceToNow(new Date(lastMessage.createdAt), { addSuffix: true })}
        </div>
      )
    },
  },
]
