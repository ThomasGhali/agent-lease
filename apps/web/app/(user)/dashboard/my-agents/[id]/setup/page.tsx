import { AgentSetupGuide } from '@/features/my-agents/components/agent-setup-guide'

const AgentSetupPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  return (
    <div className="flex flex-col items-center px-4 md:px-6 pt-3">
      <AgentSetupGuide agentId={id} />
    </div>
  )
}

export default AgentSetupPage
