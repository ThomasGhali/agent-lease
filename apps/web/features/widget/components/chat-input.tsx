import { RefObject, useTransition } from 'react'
import { ArrowUp, LoaderCircle, Square } from 'lucide-react'
import { TooltipButton } from '@/components/ui/tooltip-button'

interface ChatInputProps {
  formRef: RefObject<HTMLFormElement | null>
  textareaRef: RefObject<HTMLTextAreaElement | null>
  handleSend: (formData: FormData) => Promise<void>
  handleTyping: () => void
}

export default function ChatInput({
  formRef,
  textareaRef,
  handleSend,
  handleTyping,
}: ChatInputProps) {
  const [isPending, startTransition] = useTransition()

  const onSubmit = (formData: FormData) => {
    startTransition(async () => {
      await handleSend(formData)
    })
  }

  const handleSendOnEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      formRef.current?.requestSubmit()
    }
  }

  return (
    <div className="bg-muted flex gap-4 rounded-2xl">
      <form
        ref={formRef}
        action={onSubmit}
        className="border-muted-foreground flex w-full items-end justify-between gap-2 rounded-2xl border-[1.5px] p-2"
      >
        <textarea
          ref={textareaRef}
          autoComplete="off"
          name="chat-input"
          className="my-auto field-sizing-content max-h-30 min-h-6 flex-1 resize-none overflow-y-auto rounded-md border-none px-2 outline-none [scrollbar-color:rgb(161,161,170)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-button]:hidden [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-zinc-400/50 [&::-webkit-scrollbar-track]:bg-transparent"
          onChange={handleTyping}
          placeholder="Ask me anything"
          onKeyDown={handleSendOnEnter}
        />

        <TooltipButton
          type={isPending ? 'button' : 'submit'}
          icon={isPending ? LoaderCircle : ArrowUp}
          label={isPending ? 'Responding...' : 'Send'}
          className={
            'bg-primary flex-center hover:bg-primary-hover size-9 rounded-full text-white' +
            (isPending ? ' bg-foreground/20! cursor-wait' : ' cursor-pointer')
          }
          iconClassName={isPending ? ' animate-spin' : ''}
        />
      </form>
    </div>
  )
}
