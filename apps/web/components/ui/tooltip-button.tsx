import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { LucideIcon } from 'lucide-react'

interface TooltipButtonProps {
  /** The Lucide React Icon component to render */
  icon: LucideIcon
  /** The textual content displayed inside the hover tooltip */
  label: string
  /** Optional custom classes applied to the outer button element */
  className?: string
  /** Optional custom classes applied specifically to the icon */
  iconClassName?: string
  /** Size of the icon in pixels. @default 14 */
  size?: number
  /** Click event handler */
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  /** HTML button element type layout */
  type?: 'button' | 'submit' | 'reset'
}

/**
 * A reusable icon button that renders an accessible hover tooltip.
 * * @returns A tooltip-wrapped HTML button element.
 */
export const TooltipButton = ({
  icon: Icon,
  label,
  className,
  iconClassName,
  size = 14,
  onClick,
  type,
}: TooltipButtonProps) => (
  <Tooltip key={label}>
    <TooltipTrigger asChild>
      <button className={'icon-btn ' + className} onClick={onClick} type={type}>
        <Icon size={size} className={iconClassName} />
      </button>
    </TooltipTrigger>
    <TooltipContent>{label}</TooltipContent>
  </Tooltip>
)
