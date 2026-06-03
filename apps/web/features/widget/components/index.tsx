'use client'

import { useChat } from '@/features/widget/hooks/useChat'
import MessageList from '@/features/widget/components/message-list'
import ChatInput from '@/features/widget/components/chat-input'
import MissingAgentData from '@/features/widget/components/missing-agent-data'

export default function Widget({
  agentId,
}: {
  agentId: string | null
}) {
  if (!agentId) {
    return <MissingAgentData />
  }

  const {
    chatMessages,
    typingStatus,
    joinChat,
    handleTyping,
    handleSend,
    inputRef,
    formRef,
  } = useChat(agentId)

  return (
    <main>
      <MessageList messages={chatMessages} />
      <p className="text-xs text-gray-700">{typingStatus}</p>
      <ChatInput
        formRef={formRef}
        inputRef={inputRef}
        handleSend={handleSend}
        handleTyping={handleTyping}
      />
      <div>
        <button className="primary-btn" onClick={joinChat}>
          Join Chat Room
        </button>
      </div>
    </main>
  )
}
