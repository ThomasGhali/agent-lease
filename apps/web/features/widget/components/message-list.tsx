import { Message } from '@repo/common'
import { MarkdownContent } from './markdown-content'

interface MessageListProps {
  messages: Message[]
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <ul>
      {messages.map((msg, index) => (
        <li key={index}>
          <strong>{msg.sender}:</strong> <MarkdownContent content={msg.message} />
        </li>
      ))}
    </ul>
  )
}
