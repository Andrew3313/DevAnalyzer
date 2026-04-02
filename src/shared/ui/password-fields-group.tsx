'use client'

import { Controller } from 'react-hook-form'

import { type TPasswordWithConfirmationSchema } from '@/shared/model'
import { Field, FieldError, FieldLabel, Input } from '@/shared/ui/kit'
import { PASSWORD_FIELDS } from '@/shared/values'

import type { Control, Path } from 'react-hook-form'

interface IPasswordFieldsGroupProps<T extends TPasswordWithConfirmationSchema> {
	control: Control<T>
	disabled?: boolean
}

export const PasswordFieldsGroup = <T extends TPasswordWithConfirmationSchema>({
	control,
	disabled
}: IPasswordFieldsGroupProps<T>) => (
	<>
		{PASSWORD_FIELDS.map((fieldConfig) => (
			<Controller
				key={fieldConfig.name}
				name={fieldConfig.name as Path<T>}
				control={control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel htmlFor={field.name}>
							{fieldConfig.label}
						</FieldLabel>

						<Input
							{...field}
							id={field.name}
							type="password"
							placeholder={fieldConfig.placeholder}
							disabled={disabled}
							aria-invalid={fieldState.invalid}
						/>

						{fieldState.invalid && (
							<FieldError errors={[fieldState.error]} />
						)}
					</Field>
				)}
			/>
		))}
	</>
)
