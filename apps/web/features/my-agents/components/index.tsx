import renderAgentCards from '@/features/my-agents/components/agent-card'
import { Agent } from '@repo/db/src/generated/client/client'

export default function MyAgents() {
  return (
    <div className="mx-3 mt-5 flex flex-wrap gap-4 justify-center">
      {renderAgentCards(dummyAgents)}
    </div>
  )
}

const dummyAgents: Agent[] = [
  {
    id: '1',
    userId: '1',
    name: 'Agent 1',
    agentRole: 'Agent Role 1',
    isActive: true,
    domain: 'domain1.com',
    systemPrompt: 'systemPrompt1',
    welcomeMessage: 'welcomeMessage1',
    fallbackMessage: 'fallbackMessage1',
    themeColor: '#123456',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    userId: '1',
    name: 'Agent 2',
    agentRole: 'Agent Role 2',
    isActive: false,
    domain: 'domain2.com',
    systemPrompt: 'systemPrompt2',
    welcomeMessage: 'welcomeMessage2',
    fallbackMessage: 'fallbackMessage2',
    themeColor: '#654321',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
