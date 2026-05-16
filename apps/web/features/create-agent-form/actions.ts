"use server"

import { FormState } from '@/features/create-agent-form/components/types'

export const submitCreateAgentAction = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  // logic will fill
  return {
    success: true,
    message: 'Agent created successfully!',
    error: null,
  }
}
