import { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { Message } from '@repo/common'

export function useChat(agentId?: string | null) {
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const [typingStatus, setTypingStatus] = useState<string>('')

  const socketRef = useRef<Socket | null>(null)
  const roomName = useRef<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const joinChat = () => {
    const socket = socketRef.current
    const visitorId = roomName.current

    if (!socket) return console.error('No socket.')
    if (!visitorId) return console.error('No local visitorId.')
    if (socket.connected) return console.log('Already connected.')
    if (socket.active) return console.log('Hold tight, connecting...')

    socket.connect()
    socket.once('connect', () => {
      if (!visitorId) return console.error('No local visitorId.')
      socket.emit('join-chat')
    })
  }

  const handleRoomName = () => {
    let visitorId = localStorage.getItem('visitorId')
    if (!visitorId) {
      visitorId = crypto.randomUUID()
      localStorage.setItem('visitorId', visitorId)
    }
    roomName.current = visitorId
    return visitorId
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

  const handleSend = (formData: FormData) => {
    const socket = socketRef.current
    const message = formData.get('chat-input')
    if (typeof message !== 'string')
      return console.error(
        `Unsupported data format used ${typeof message} for message`,
      )

    const payload = { message }

    if (!socket || !socket.connected || !message)
      return console.log('No socket.')

    socket.emit('message', payload, (response: { status: string }) => {
      inputRef.current!.disabled = true
      if (response.status === 'success') {
        if (inputRef.current) inputRef.current.value = ''
      } else {
        console.error('Server rejected message')
      }
      inputRef.current!.disabled = false
    })
  }

  useEffect(() => {
    if (!agentId) return console.error('No agentId provided')

    const visitorId = handleRoomName()

    if (!visitorId) return console.error('No local visitorId.')

    const chat = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL, {
      auth: {
        agentId,
        visitorId,
      },
      autoConnect: false,
    })
    socketRef.current = chat

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
  }, [agentId])

  return {
    chatMessages,
    typingStatus,
    joinChat,
    handleTyping,
    handleSend,
    inputRef,
    formRef,
  }
}
