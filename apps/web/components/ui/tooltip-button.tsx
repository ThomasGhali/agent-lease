import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { LucideIcon } from 'lucide-react'

interface TooltipButtonProps {
  label: string
  icon: LucideIcon
  className?: string
  size?: number
  onClick?: (...args: any[]) => any
  type?: 'button' | 'submit' | 'reset'
}

export const TooltipButton = ({
  icon: Icon,
  label,
  className,
  size = 14,
  onClick,
  type,
}: TooltipButtonProps) => (
  <Tooltip key={label}>
    <TooltipTrigger asChild>
      <button className={'icon-btn ' + className} onClick={onClick} type={type}>
        <Icon size={size} />
      </button>
    </TooltipTrigger>
    <TooltipContent>{label}</TooltipContent>
  </Tooltip>
)
