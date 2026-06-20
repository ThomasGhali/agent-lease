import { Message } from '@repo/common'
import { LucideIcon } from 'lucide-react'

export interface MessageListProps {
  messages: Message[]
}

export interface IconButton {
  label: string
  icon: LucideIcon
  className?: string
  onClick?: () => void
}
