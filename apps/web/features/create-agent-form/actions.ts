"use server"

import { FormState } from '@/features/create-agent-form/components/types'

export const submitCreateAgentAction = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  // logic will fill
  console.log('submitCreateAgentAction has been triggered')

  await new Promise(resolve => setTimeout(resolve, 3000))

  return {
    success: true,
    message: 'Agent created successfully!',
    error: null,
  }
}
