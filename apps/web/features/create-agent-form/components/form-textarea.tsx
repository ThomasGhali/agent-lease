import { Controller, FieldValues } from 'react-hook-form'

import { Field, FieldLabel, FieldError } from '@/components/ui/field'

import {
  InputGroup,
  InputGroupTextarea,
  InputGroupAddon,
  InputGroupText,
} from '@/components/ui/input-group'
import { FormTextareaProps } from '@/features/create-agent-form/components/types'

export default function FormTextarea<T extends FieldValues>({
  control,
  name,
  label,
  required = false,
  placeholder = 'Enter text ..',
  maxLength = 250,
}: FormTextareaProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel
            className={required ? 'required-field' : ''}
            htmlFor={name}
          >
            {label}
          </FieldLabel>
          <InputGroup>
            <InputGroupTextarea
              required={required}
              aria-required={required}
              {...field}
              id={name}
              placeholder={placeholder}
              rows={6}
              className="h-30 resize-none"
              aria-invalid={fieldState.invalid}
              maxLength={maxLength}
            />
            <InputGroupAddon align="block-end">
              <InputGroupText className="tabular-nums">
                {(field.value || '').length}/{maxLength} characters
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}
