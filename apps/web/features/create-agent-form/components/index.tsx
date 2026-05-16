import { useForm } from 'react-hook-form'
import z from 'zod'
import { createAgentFormSchema } from '@repo/validation'
import { zodResolver } from '@hookform/resolvers/zod'

export default function CreateAgentForm() {
  const {control, reset, handleSubmit} = useForm<z.input<typeof createAgentFormSchema>>({
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

  return (
    <div>
      <h1>Create Agent</h1>
    </div>
  )
}
