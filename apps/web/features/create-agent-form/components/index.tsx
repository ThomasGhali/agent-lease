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
        description: '',
      })
    } else if (state?.error) {
      toast.error('Error', {
        description: state.error,
        id: 'form-status',
        position: 'top-right',
      })
    } else if (state?.success) {
      toast.success('Message sent successfully!', {
        id: 'form-status',
        position: 'top-right',
        description: '',
      })
      reset()
      router.push('/dashboard/my-agents')
    }
  }, [state, isPending, reset])

  return (
    <div className="flex-center w-full">
      <form
        onSubmit={handleSubmit(serverSubmit)}
        id="create-agent-form"
        className="flex-center mx-10 my-4 w-full max-w-2xl flex-col"
      >
        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {inputFields.map(field => {
            const wrapperClass = field.className || 'md:col-span-2'
            
            return (
              <div key={field.name} className={wrapperClass}>
                {field.type === 'textarea' ? (
                  <FormTextarea
                    control={control}
                    name={field.name}
                    label={field.label}
                    required={field.required}
                    placeholder={field.placeholder}
                    maxLength={field.maxLength}
                  />
                ) : field.type === 'switch' ? (
                  <FormSwitch
                    control={control}
                    name={field.name}
                    label={field.label}
                    required={field.required}
                  />
                ) : (
                  <FormInput
                    control={control}
                    name={field.name}
                    label={field.label}
                    required={field.required}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            )
          })}
        </FieldGroup>

        <Field className="mt-8 justify-center" orientation="horizontal">
          <FormResetBtn reset={reset} success={state.success} />

          {/* Submit button */}
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-primary-foreground w-auto min-w-32 cursor-pointer rounded-xs px-5"
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
    </div>
  )
}
