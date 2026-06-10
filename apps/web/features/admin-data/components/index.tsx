import { SectionCards } from './section-cards'
import { getAdminDashboardData } from '../queries'

const AdminData = async () => {
  const data = await getAdminDashboardData()
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-2 md:gap-6 md:py-4">
          <SectionCards />
          <div className="px-4 lg:px-6">{/* <ChartAreaInteractive /> */}</div>
          {/* <DataTable data={data} /> */}
        </div>
      </div>
    </div>
  )
}

export default AdminData
