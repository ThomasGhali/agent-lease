'use client'

import { useChat } from '@/features/widget/hooks/useChat'
import MessageList from '@/features/widget/components/message-list'
import ChatInput from '@/features/widget/components/chat-input'
import MissingAgentData from '@/features/widget/components/missing-agent-data'
import { MoreHorizontal, X } from 'lucide-react'
import { TooltipButton } from '@/components/ui/tooltip-button'

export default function Widget({ agentId }: { agentId: string | null }) {
  const {
    chatMessages,
    typingStatus,
    handleTyping,
    handleSend,
    textareaRef,
    formRef,
  } = useChat(agentId)

  if (!agentId) {
    return <MissingAgentData />
  }

  return (
    <div className="bg-background border-border/50 pointer-events-auto relative mt-auto flex h-full w-full flex-col items-center justify-start overflow-hidden rounded-4xl border shadow-2xl">
      <header className="border-b-muted-foreground/30 flex h-[70px] w-full shrink-0 items-center justify-between border-b px-7 py-2">
        <div>
          <p className="">Tommy Bot</p>
          <p className="text-foreground/60 text-sm">Your AI helper</p>
        </div>
        <div className="text-foreground/60 -mr-1.5 flex gap-3">
          <TooltipButton size={23} icon={MoreHorizontal} label="Settings" />
          <TooltipButton
            size={23}
            icon={X}
            label="Close"
            onClick={() => {
              if (typeof window !== 'undefined' && window !== window.parent) {
                window.parent.postMessage({ type: 'close-widget' }, '*')
              }
            }}
          />
        </div>
      </header>

      <main className="mb-13 w-full flex-1 overflow-auto [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-button]:hidden [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-zinc-400/50 [&::-webkit-scrollbar-track]:bg-transparent">
        <MessageList messages={chatMessages} />
        <p className="text-xs text-gray-700">{typingStatus}</p>
      </main>

      <footer className="absolute bottom-7 w-[calc(100%-3.5rem)]">
        <ChatInput
          formRef={formRef}
          textareaRef={textareaRef}
          handleSend={handleSend}
          handleTyping={handleTyping}
        />
      </footer>
    </div>
  )
}
