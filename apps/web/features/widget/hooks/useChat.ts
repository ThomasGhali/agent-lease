import { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { Message } from '@repo/common'

export function useChat(agentId?: string | null) {
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const [typingStatus, setTypingStatus] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  const socketRef = useRef<Socket | null>(null)
  const roomName = useRef<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const wrapperRef = useRef<HTMLElement>(null)

  const joinChat = () => {
    const socket = socketRef.current
    const visitorId = roomName.current

    if (!socket) return console.error('No socket.')
    if (!visitorId) return console.error('No local visitorId.')
    if (socket.connected) return console.warn('Already connected.')
    if (socket.active) return console.warn('Hold tight, connecting...')

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

  const handleSend = async (formData: FormData) => {
    const socket = socketRef.current
    const message = formData.get('chat-input')
    if (typeof message !== 'string')
      return console.error(
        `Unsupported data format used ${typeof message} for message`,
      )

    if (textareaRef.current?.value.trim().length === 0)
      return console.error('Empty message.')

    const payload = { message }

    if (!socket || !socket.connected) return console.error('No socket.')

    if (textareaRef.current) textareaRef.current.disabled = true

    return new Promise<void>(resolve => {
      socket.emit('message', payload, (response: { status: string }) => {
        if (response.status === 'success') {
          if (textareaRef.current) textareaRef.current.value = ''
        }

        if (textareaRef.current) textareaRef.current.disabled = false
        resolve()
      })
    })
  }

  useEffect(() => {
    if (chatMessages.length)
      wrapperRef.current?.scrollTo({
        top: wrapperRef.current.scrollHeight,
        behavior: 'smooth',
      })
  }, [chatMessages])

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
      setIsLoading(false)
    })

    chat.on('typing-status', (status: string) => {
      setTypingStatus(status)
    })

    joinChat()

    if (chatMessages.length)
      wrapperRef.current?.scrollTo({
        top: wrapperRef.current.scrollHeight,
        behavior: 'smooth',
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
    isLoading,
    handleTyping,
    handleSend,
    textareaRef,
    formRef,
    wrapperRef,
  }
}
