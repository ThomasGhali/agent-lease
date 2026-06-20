import { MarkdownContent } from './markdown-content'

import { MessageListProps } from '@/features/widget/types'
import { aiResponseBtns, humanMessageBtns } from '@/features/widget/data'
import { TooltipButton } from '@/components/ui/tooltip-button'
import { Sparkles } from 'lucide-react'

export default function MessageList({ messages }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="font-inter animate-in fade-in flex h-[80%] flex-col items-center justify-center px-6 py-8 text-center duration-500">
        <div className="bg-primary/10 text-primary ring-primary/5 mb-5 flex h-16 w-16 items-center justify-center rounded-full ring-8">
          <Sparkles size={32} />
        </div>
        <div className="max-w-[280px] space-y-2">
          <h3 className="text-foreground text-2xl font-bold tracking-tight">
            Ready when you are
          </h3>
          <p className="text-muted-foreground text-[14px] leading-relaxed">
            Ask me anything about our services, account, or how to get started.
          </p>
        </div>
      </div>
    )
  }

  return (
    <ul className="mb-15">
      {messages.map((msg, index) =>
        msg.sender === 'VISITOR' ? (
          <li key={index} className="group">
            <p className="bg-muted-foreground/20 mx-2 mt-4 rounded-4xl px-4 py-2">
              {msg.message}
            </p>
            <div className="mr-6 flex justify-end gap-1">
              {humanMessageBtns.map(({ icon, label, className }) =>
                TooltipButton({ icon, label, className }),
              )}
            </div>
          </li>
        ) : (
          <li key={index} className="mb-10 px-4">
            <MarkdownContent content={msg.message} />
            <div className="mt-2 flex gap-1">
              {aiResponseBtns.map(({ icon, label }) =>
                TooltipButton({ icon, label }),
              )}
            </div>
          </li>
        ),
      )}
    </ul>
  )
}
