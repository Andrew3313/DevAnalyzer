'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
	passwordWithConfirmationSchema,
	type TPasswordWithConfirmationSchema
} from '@/shared/model'
import { PasswordFieldsGroup, WrapperCard } from '@/shared/ui'
import { Button, FieldGroup } from '@/shared/ui/kit'

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
		<WrapperCard
			title="Обновление пароля"
			description="Введите новый пароль для вашей учётной записи"
			className="max-w-full"
		>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="flex flex-col items-center space-y-4"
			>
				<FieldGroup className="grid grid-cols-1 md:grid-cols-2">
					<PasswordFieldsGroup
						control={form.control}
						disabled={isUpdatingPassword}
					/>

					<div className="col-span-1 flex justify-end md:col-span-2">
						<Button type="submit" disabled={isUpdatingPassword}>
							Обновить пароль
						</Button>
					</div>
				</FieldGroup>
			</form>
		</WrapperCard>
	)
}
