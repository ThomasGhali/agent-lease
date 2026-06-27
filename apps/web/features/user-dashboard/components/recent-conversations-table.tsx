// import { mockConversations } from '@/features/user-dashboard/data'
import { getRecentConversations } from '@/features/user-dashboard/queries'
import { ConversationsDataTable } from './conversations-data-table'

const RecentConversationsTable = async () => {
  // const conversations = mockConversations
  const conversations = await getRecentConversations()

  return (
    <div className="space-y-4">
      <div className="px-4 lg:px-6">
        <h2 className="text-xl font-semibold tracking-tight">Recent Conversations</h2>
        <p className="text-muted-foreground text-sm">
          Latest messages from your visitors.
        </p>
      </div>
      <ConversationsDataTable data={conversations || []} />
    </div>
  )
}

export default RecentConversationsTable
