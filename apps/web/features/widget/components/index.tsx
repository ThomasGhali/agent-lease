'use client'

import { useSearchParams } from 'next/navigation'
import { useChat } from '@/features/widget/hooks/useChat'
import MessageList from '@/features/widget/components/message-list'
import ChatInput from '@/features/widget/components/chat-input'

export default function Widget() {
  const agentId = useSearchParams().get('agentId')
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
