import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Globe,
  MoreHorizontal,
  TerminalSquare,
  Trash2,
  Edit3,
  ExternalLink,
} from 'lucide-react'

import { Agent } from '@repo/db/src/generated/client/client'

export default function renderAgentCards(agents: Agent[]) {
  return agents.map(agent => (
    <div key={agent.id} className="group bg-card text-card-foreground dark:hover:border-primary/50 relative flex w-80 flex-col gap-4 rounded-xl border p-5 shadow-sm transition-all hover:shadow-md">
      <AgentCardHeader name={agent.name} agentRole={agent.agentRole} />

      {/* Domain Name */}
      <div className="grid grid-cols-1 gap-3">
        <div className="bg-muted/40 text-muted-foreground ring-border/50 flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium ring-1 ring-inset">
          <Globe className="h-3.5 w-3.5" />
          <span className="truncate">{agent.domain}</span>
        </div>
      </div>

      <AgentCardFooter isActive={agent.isActive} />
    </div>
  ))
}

type AgentCardHeaderProps = Pick<Agent, 'name' | 'agentRole'>
const AgentCardHeader = ({ name, agentRole }: AgentCardHeaderProps) => (
  <div className="flex items-start justify-between">
    <div className="flex items-center gap-3">
      <div className="bg-primary/10 text-primary group-hover:bg-primary/20 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
        <TerminalSquare className="h-5 w-5" />
      </div>
      <div>
        <h3 className="leading-none font-semibold tracking-tight">{name}</h3>
        <p className="text-muted-foreground mt-1.5 text-xs font-medium">
          {agentRole}
        </p>
      </div>
    </div>

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground h-8 w-8"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem className="gap-2">
          <Edit3 className="h-4 w-4" /> Edit Agent
        </DropdownMenuItem>
        <DropdownMenuItem className="text-primary gap-2">
          <ExternalLink className="h-4 w-4" /> View Logs
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive gap-2">
          <Trash2 className="h-4 w-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
)

type AgentCardFooterProps = Pick<Agent, 'isActive'>
const AgentCardFooter = ({ isActive }: AgentCardFooterProps) => (
  <div className="border-border/40 mt-2 flex items-center justify-between border-t pt-4">
    <div className="flex items-center gap-2">
      <Switch
        id="active-agent"
        defaultChecked={isActive}
        className="origin-left scale-75"
      />
      <Label
        htmlFor="active-agent"
        className="text-foreground/80 cursor-pointer text-[13px] font-medium select-none"
      >
        Active
      </Label>
    </div>

    <div className="flex items-center gap-1">
      <Button variant="outline" size="sm" className="h-8 text-xs font-medium">
        Details
      </Button>
    </div>
  </div>
)
