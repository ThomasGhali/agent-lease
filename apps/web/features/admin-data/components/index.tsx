import { SectionCards } from './section-cards'
import { getAdminDashboardData } from '../queries'
import { RecentPaymentsTable } from '@/features/admin-data/components/recent-payments-table'

const AdminData = async () => {
  const data = await getAdminDashboardData()
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-2 md:gap-6 md:py-4">
          <SectionCards metrics={data.metrics} />
          <RecentPaymentsTable data={data.recentPayments} />
        </div>
      </div>
    </div>
  )
}

export default AdminData
