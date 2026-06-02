import { RefObject } from 'react'

interface ChatInputProps {
  formRef: RefObject<HTMLFormElement | null>
  inputRef: RefObject<HTMLInputElement | null>
  handleSend: (formData: FormData) => void
  handleTyping: () => void
}

export default function ChatInput({
  formRef,
  inputRef,
  handleSend,
  handleTyping,
}: ChatInputProps) {
  return (
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
  )
}
