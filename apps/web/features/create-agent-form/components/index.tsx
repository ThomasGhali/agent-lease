import { FieldValues, useForm } from 'react-hook-form'
import z from 'zod'
import { createAgentFormSchema } from '@repo/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { startTransition, useActionState } from 'react'
import { submitCreateAgentAction } from '@/features/create-agent-form/actions'
import { FormState } from '@/features/create-agent-form/components/types'

export default function CreateAgentForm() {
  const { control, reset, handleSubmit } = useForm<
    z.input<typeof createAgentFormSchema>
  >({
    resolver: zodResolver(createAgentFormSchema),
    mode: 'onChange',
    defaultValues: {
      agentName: '',
      agentRole: '',
      domain: '',
      systemPrompt: '',
      welcomeMessage: '',
      fallbackMessage: '',
      themeColor: '#000000',
    },
  })

  const initialState: FormState = {
    success: false,
    error: null,
    fieldErrors: undefined,
    message: null,
  }

  const [state, formAction, isPending] = useActionState(
    submitCreateAgentAction,
    initialState,
  )

  const serverSubmit = (data: FieldValues, event: React.BaseSyntheticEvent) => {
    const formData = new FormData(event.target as HTMLFormElement)

    startTransition(() => {
      formAction(formData)
    })
  }

  return (
    <div>
      <h1>Create Agent</h1>
    </div>
  )
}
