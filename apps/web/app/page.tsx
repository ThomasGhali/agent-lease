'use client'

import { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { Message } from '@repo/common'

interface ServerToClientEvents {
  message: (message: Message[]) => void
  'typing-status': (status: string) => void
}

interface ClientToServerEvents {
  'join-chat': (roomName: string) => void
  message: (
    payload: { message: string; roomName: string | null },
    callback: (response: { status: string }) => void,
  ) => void
  typing: (isTyping: boolean) => void
}

export default function Home() {
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const [typingStatus, setTypingStatus] = useState<string>('')

  const socketRef = useRef<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null)
  const roomName = useRef<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const joinChat = () => {
    const socket = socketRef.current
    const room = roomName.current

    if (!socket) return console.error('No socket.')
    if (!room) return console.error('No room.')
    if (socket.connected) return console.log('Already connected.')
    if (socket.active) return console.log('Hold tight, connecting...')
    console.log('chatmessages:', chatMessages)

    socket.connect()
    socket.once('connect', () => {
      if (!room) return console.error('No room.')
      socket.emit('join-chat', room)
    })
  }

  const handleRoomName = () => {
    let visitorId = localStorage.getItem('visitorId')
    if (!visitorId) {
      visitorId = crypto.randomUUID()
      localStorage.setItem('visitorId', visitorId)
    }
    roomName.current = visitorId
  }

  const handleTyping = () => {
    const socket = socketRef.current
    if (!socket || !socket.connected) return

    socket.emit('typing', true)

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('typing', false)
    }, 1500)
  }

  useEffect(() => {
    const chat = io('http://localhost:3002/chat', {
      autoConnect: false,
    })
    socketRef.current = chat

    handleRoomName()

    chat.on('message', (message: Message[]) => {
      setChatMessages(prevMessages => [...prevMessages, ...message])
    })

    chat.on('typing-status', (status: string) => {
      setTypingStatus(status)
    })

    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
      socketRef.current?.disconnect()
      socketRef.current?.off()
    }
  }, [])

  const handleSend = (formData: FormData) => {
    if (!roomName.current) return console.error('No room created.')

    const socket = socketRef.current
    const message = formData.get('chat-input')
    if (typeof message !== 'string')
      return console.error(
        `Unsupported data format used ${typeof message} for message`,
      )

    const payload = { message, roomName: roomName.current }

    if (!socket || !socket.connected || !message)
      return console.log('No socket.')

    socket.emit('message', payload, (response: { status: string }) => {
      if (response.status === 'ok') {
        setChatMessages(prev => [...prev, { sender: 'VISITOR', message: message }])
        if (inputRef.current) inputRef.current.value = ''
      } else {
        console.error('Server rejected message')
      }
    })
  }

  return (
    <main>
      <ul>
        {chatMessages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.sender}:</strong> {msg.message}
          </li>
        ))}
      </ul>
      <p className="text-xs text-gray-700">{typingStatus}</p>
      <div className="flex gap-4">
        <form ref={formRef} action={handleSend}>
          <input
            ref={inputRef}
            autoComplete="off"
            name="chat-input"
            className="rounded-md border border-gray-300 p-2"
            type="text"
            onChange={handleTyping}
          />
          <button type="submit" className="secondary-btn">
            Send
          </button>
        </form>
      </div>
      <div>
        <button className="primary-btn" onClick={joinChat}>
          Join Chat Room
        </button>
      </div>
    </main>
  )
}
