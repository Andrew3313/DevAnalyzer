'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
	passwordWithConfirmationSchema,
	type TPasswordWithConfirmationSchema
} from '@/shared/model'
import { PasswordFieldsGroup } from '@/shared/ui'
import { Button, Field, FieldGroup } from '@/shared/ui/kit'

import { useUpdatePassword } from '../hooks'

const INITIAL_FORM_STATE: TPasswordWithConfirmationSchema = {
	password: '',
	confirmPassword: ''
}

export function UpdatePasswordForm() {
	const form = useForm<TPasswordWithConfirmationSchema>({
		resolver: zodResolver(passwordWithConfirmationSchema),
		mode: 'onTouched',
		defaultValues: INITIAL_FORM_STATE
	})

	const { updatePassword, isUpdatingPassword } = useUpdatePassword({
		onSuccess: () => {
			form.reset()
		}
	})

	const handleSubmit = (values: TPasswordWithConfirmationSchema) =>
		updatePassword(values)

	return (
		<form onSubmit={form.handleSubmit(handleSubmit)}>
			<FieldGroup>
				<PasswordFieldsGroup
					control={form.control}
					disabled={isUpdatingPassword}
				/>

				<Field>
					<Button type="submit" disabled={isUpdatingPassword}>
						Обновить пароль
					</Button>
				</Field>
			</FieldGroup>
		</form>
	)
}
