'use client'

import { startTransition, useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldValues, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { Loader2Icon } from 'lucide-react'

import { createAgentFormSchema } from '@repo/validation'

import { submitCreateAgentAction } from '@/features/create-agent-form/actions'
import FormInput from '@/features/create-agent-form/components/form-input'
import FormResetBtn from '@/features/create-agent-form/components/form-reset-button'
import FormSwitch from '@/features/create-agent-form/components/form-switch'
import FormTextarea from '@/features/create-agent-form/components/form-textarea'
import { FormState } from '@/features/create-agent-form/components/types'
import { inputFields } from '@/features/create-agent-form/data'

import { Button } from '@/components/ui/button'
import { Field, FieldGroup } from '@/components/ui/field'

export default function CreateAgentForm() {
  const router = useRouter()

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

  const serverSubmit = (
    data: FieldValues,
    event?: React.BaseSyntheticEvent,
  ) => {
    if (!event) return
    const formData = new FormData(event.target as HTMLFormElement)

    startTransition(() => {
      formAction(formData)
    })
  }

  // toast appearance control
  useEffect(() => {
    if (isPending) {
      toast.loading('Submitting...', {
        id: 'form-status',
        position: 'top-right',
      })
    } else if (state?.error) {
      toast.error('Error', {
        description: state.error,
        id: 'form-status', // Replaces the loading toast
        position: 'top-right',
      })
    } else if (state?.success) {
      toast.success('Message sent successfully!', {
        id: 'form-status', // Replaces the loading toast
        position: 'top-right',
      })
      reset()
      router.push('/dashboard/my-agents')
    }
  }, [state, isPending, reset])

  return (
    <form onSubmit={handleSubmit(serverSubmit)} id="create-agent-form">
      <FieldGroup>
        {inputFields.map(field => {
          if (field.type === 'textarea') {
            return (
              <FormTextarea
                key={field.name}
                control={control}
                name={field.name}
                label={field.label}
                required={field.required}
                placeholder={field.placeholder}
              />
            )
          } else if (field.type === 'switch') {
            return (
              <FormSwitch
                key={field.name}
                control={control}
                name={field.name}
                label={field.label}
              />
            )
          } else {
            return (
              <FormInput
                key={field.name}
                control={control}
                name={field.name}
                label={field.label}
                required={field.required}
                placeholder={field.placeholder}
              />
            )
          }
        })}
      </FieldGroup>

      <Field className="mt-8 justify-center" orientation="horizontal">
        <FormResetBtn reset={reset} success={state.success} />

        {/* Submit button */}
        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-primary-foreground w-32 cursor-pointer rounded-xs"
          form="create-agent-form"
          disabled={isPending || state.success}
        >
          {isPending ? (
            <>
              <Loader2Icon className="animate-spin" />
              Submitting ..
            </>
          ) : state.success ? (
            'Submitted'
          ) : (
            'Submit'
          )}
        </Button>
      </Field>
    </form>
  )
}
