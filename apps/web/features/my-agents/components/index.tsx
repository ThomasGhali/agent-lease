import renderAgentCards from '@/features/my-agents/components/agent-card'
import { getMyAgentsData } from '@/features/my-agents/queries'
import { Agent } from '@repo/db'

export default async function MyAgents() {
  const agents = await getMyAgentsData()
  const agentsData: Agent[] | [] = agents.data ?? []
  return (
    <div className="mx-3 mt-5 flex flex-wrap justify-center gap-4">
      {renderAgentCards(agentsData)}
    </div>
  )
}
