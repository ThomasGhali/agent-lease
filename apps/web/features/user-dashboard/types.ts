import {
  getAgentsData,
  getRecentConversations,
  getUserStatsData,
} from '@/features/user-dashboard/queries'

export type AgentsData = Awaited<ReturnType<typeof getAgentsData>>

export type ConversationsData = Awaited<
  ReturnType<typeof getRecentConversations>
>

export type UserStatsData = Awaited<ReturnType<typeof getUserStatsData>>
