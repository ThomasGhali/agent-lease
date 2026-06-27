import AgentsTable from '@/features/user-dashboard/components/agents-table'
import RecentConversationsTable from '@/features/user-dashboard/components/recent-conversations-table'
import UserStats, { UserStatsSkeleton } from '@/features/user-dashboard/components/user-stats'
import { Suspense } from 'react'

const TableSkeleton = () => (
  <div className="space-y-4 px-4 lg:px-6">
    <div className="h-[28px] w-48 animate-pulse rounded-md bg-muted" />
    <div className="h-[280px] w-full animate-pulse rounded-md border bg-muted/20" />
  </div>
)

const UserDashboard = () => {
  return (
    <main className="space-y-8 pb-10">
      <Suspense fallback={<UserStatsSkeleton />}>
        <UserStats />
      </Suspense>
      
      <Suspense fallback={<TableSkeleton />}>
        <AgentsTable />
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        <RecentConversationsTable />
      </Suspense>
    </main>
  )
}

export default UserDashboard
