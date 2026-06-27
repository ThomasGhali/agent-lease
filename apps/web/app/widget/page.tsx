import { getCachedAgent } from '@/features/my-agents/utils'
import Widget from '@/features/widget/components'

interface WidgetSearchParams {
  agentId: string
}

export default async function WidgetPage({
  searchParams,
}: {
  searchParams: Promise<WidgetSearchParams>
}) {
  const { agentId } = await searchParams

  const agentData = await getCachedAgent(agentId)

  return <Widget agentId={agentId} agentData={agentData} />
}
