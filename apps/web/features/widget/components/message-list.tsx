import { Message } from '@repo/common'

interface MessageListProps {
  messages: Message[]
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <ul>
      {messages.map((msg, index) => (
        <li key={index}>
          <strong>{msg.sender}:</strong> {msg.message}
        </li>
      ))}
    </ul>
  )
}
