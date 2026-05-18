import { FieldValues, Path, Control } from 'react-hook-form'
import { createAgentFormSchema } from '@repo/validation'
import z from 'zod'
import React from 'react'

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
  maxLength?: number
}

export interface InputField {
  name: Path<z.input<typeof createAgentFormSchema>>
  label: string
  placeholder?: string
  required?: boolean
  type?: React.HTMLInputTypeAttribute | 'textarea' | 'switch'
  maxLength?: number
  className?: string
}

export type FormState = {
  success: boolean
  error?: string | null
  fieldErrors?: Partial<
    Record<keyof z.infer<typeof createAgentFormSchema>, string[]>
  >
  message?: string | null
}

export interface FormSwitchProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  required?: boolean
  description?: string
}
