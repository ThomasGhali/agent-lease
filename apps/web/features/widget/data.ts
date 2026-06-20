import { IconButton } from "@/features/widget/types"
import { Copy, Ellipsis, Pencil, RotateCcw, ThumbsDown, ThumbsUp } from "lucide-react"

export const aiResponseBtns: IconButton[] = [
  { label: 'Good response', icon: ThumbsUp },
  { label: 'Bad response', icon: ThumbsDown },
  { label: 'Redo', icon: RotateCcw },
  { label: 'Copy Response', icon: Copy },
  { label: 'More', icon: Ellipsis },
]

export const humanMessageBtns: IconButton[] = [
  {
    label: 'Copy',
    icon: Copy,
    className: 'mt-1 group-hover:opacity-100 opacity-0',
  },
  {
    label: 'Edit',
    icon: Pencil,
    className: 'mt-1 group-hover:opacity-100 opacity-0',
  },
]
