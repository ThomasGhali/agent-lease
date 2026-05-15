import { FieldValues, Path, Control } from 'react-hook-form'
import z from 'zod'

export const createAgentFormSchema = z.object({
  agentName: z.string().min(1, 'Agent name is required'),
  agentRole: z.string().min(1, 'Agent role is required'),
  isActive: z.boolean().default(false),
  domain: z.string().min(1, 'Domain is required'),
  systemPrompt: z.string().min(1, 'System prompt is required'),
  welcomeMessage: z.string().optional(),
  fallbackMessage: z.string().optional(),
  themeColor: z.string().default('#000000'),
})

export interface FormInputProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  required?: boolean
  placeholder?: string
  label: string
  type?: React.HTMLInputTypeAttribute
}

export interface FormTextareaProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  required?: boolean
  placeholder?: string
}
