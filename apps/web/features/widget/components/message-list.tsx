import { MarkdownContent } from './markdown-content'

import { MessageListProps } from '@/features/widget/types'
import { aiResponseBtns, humanMessageBtns } from '@/features/widget/data'
import { TooltipButton } from '@/components/ui/tooltip-button'
import { Sparkles } from 'lucide-react'
import { Message } from '@repo/common'

export default function MessageList({
  messages,
}: MessageListProps) {
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

  const someMessages: Message[] = [
    {
      sender: 'SYSTEM',
      message: 'You have been connected to an AI assistant for Agent Lease.',
    },
    {
      sender: 'VISITOR',
      message: 'Hi, i would like to know more about your services please.',
    },
    {
      sender: 'AI_SUPPORT',
      message: `### How to do it:
  1. Log into your Upstash console and click on your Redis Database.
  2. Click on the \`Data Browser\` tab at the top.
  3. **Click the "Create Key"** (or "Upsert Key") button.`,
    },
    {
      sender: 'VISITOR',
      message: 'Hi, i would like to know more about your services please.',
    },
    {
      sender: 'AI_SUPPORT',
      message: `### How to do it:
  1. Log into your Upstash console and click on your Redis Database.
  2. Click on the \`Data Browser\` tab at the top.
  3. **Click the "Create Key"** (or "Upsert Key") button.`,
    },
    {
      sender: 'VISITOR',
      message: 'Hi, i would like to know more about your services please.',
    },
    {
      sender: 'AI_SUPPORT',
      message: `### How to do it:
  1. Log into your Upstash console and click on your Redis Database.
  2. Click on the \`Data Browser\` tab at the top.
  3. **Click the "Create Key"** (or "Upsert Key") button.`,
    },
  ]

  return (
    <ul className="mb-15" >
      {messages.map((msg, index) => {
        if (msg.sender === 'VISITOR') return visitorMessage(msg, index)
        if (msg.sender === 'AI_SUPPORT') return aiMessage(msg, index)
        if (msg.sender === 'SYSTEM') return systemMessage(msg, index)

        console.error('Unknown sender:', msg.sender)
        return null
      })}
    </ul>
  )
}

const visitorMessage = (msg: Message, index: number) => (
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
)

const aiMessage = (msg: Message, index: number) => (
  <li key={index} className="mb-10 px-4">
    <MarkdownContent content={msg.message} />
    <div className="mt-2 flex gap-1">
      {aiResponseBtns.map(({ icon, label }) => TooltipButton({ icon, label }))}
    </div>
  </li>
)

const systemMessage = (msg: Message, index: number) => {
  const isError =
    msg.message.toLowerCase().includes('error') ||
    msg.message.toLowerCase().includes('fail') ||
    msg.message.toLowerCase().includes('limit') ||
    msg.message.toLowerCase().includes('quota') ||
    msg.message.toLowerCase().includes('blocked')

  return (
    <li
      key={index}
      className="animate-in fade-in slide-in-from-bottom-1 mx-4 my-3 flex justify-center duration-200"
    >
      <div
        className={`max-w-[90%] rounded-2xl border px-4 py-2 text-center text-xs leading-relaxed shadow-sm ${
          isError
            ? 'bg-destructive/10 border-destructive/20 text-destructive font-medium'
            : 'bg-muted/40 border-border/10 text-foreground/70'
        }`}
      >
        {msg.message}
      </div>
    </li>
  )
}
