import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Plus } from 'lucide-react'
import Link from 'next/link'

const CreateAgentButton = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="default"
          className="fixed right-6 bottom-6 size-15 rounded-full"
          asChild
        >
          <Link href="/dashboard/my-agents/create-an-agent">
            <Plus className="size-6" />
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Create a new agent</TooltipContent>
    </Tooltip>
  )
}

export default CreateAgentButton
