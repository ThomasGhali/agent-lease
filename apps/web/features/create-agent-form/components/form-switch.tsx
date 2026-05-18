import { Controller, FieldValues } from 'react-hook-form'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import { Switch } from '@/components/ui/switch'
import { FormSwitchProps } from '@/features/create-agent-form/components/types'

export default function FormSwitch<T extends FieldValues>({
  control,
  name,
  label,
  required = false,
  description,
}: FormSwitchProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ...field }, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FieldLabel
                aria-required={required}
                className={required ? 'required-field' : ''}
                htmlFor={name}
              >
                {label}
              </FieldLabel>
              {description && (
                <p className="text-muted-foreground text-sm">{description}</p>
              )}
            </div>
            <Switch
              id={name}
              checked={value}
              onCheckedChange={onChange}
              {...field}
            />
          </div>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}
