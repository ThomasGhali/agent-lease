// import { mockAgents } from '@/features/user-dashboard/data'
import { getAgentsData } from '@/features/user-dashboard/queries'
import { AgentsDataTable } from './agents-data-table'

const AgentsTable = async () => {
  // const agents = mockAgents
  const agents = await getAgentsData()

  return (
    <div className="space-y-4">
      <div className="px-4 lg:px-6">
        <h2 className="text-xl font-semibold tracking-tight">Active Agents</h2>
        <p className="text-muted-foreground text-sm">
          Manage your deployed AI agents.
        </p>
      </div>
      <AgentsDataTable data={agents || []} />
    </div>
  )
}

export default AgentsTable
