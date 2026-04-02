'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
	passwordWithConfirmationSchema,
	type TPasswordWithConfirmationSchema
} from '@/shared/model'
import { PasswordFieldsGroup, WrapperCard } from '@/shared/ui'
import { Button, Field, FieldGroup } from '@/shared/ui/kit'
import { Route } from '@/shared/values'

import { useResetPassword } from '../hooks'

const INITIAL_FORM_STATE: TPasswordWithConfirmationSchema = {
	password: '',
	confirmPassword: ''
}

interface IResetPasswordFormProps {
	token: string
}

export function ResetPasswordForm({ token }: IResetPasswordFormProps) {
	const form = useForm<TPasswordWithConfirmationSchema>({
		resolver: zodResolver(passwordWithConfirmationSchema),
		mode: 'onTouched',
		defaultValues: INITIAL_FORM_STATE
	})

	const { resetPassword, isLoadingResetPassword } = useResetPassword(token, {
		onSuccess: () => {
			form.reset()
		}
	})

	const handleSubmit = (values: TPasswordWithConfirmationSchema) =>
		resetPassword(values)

	return (
		<WrapperCard
			title="Сброс пароля"
			footerLinkLabel="На главную ->"
			footerLinkHref={Route.Home}
		>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<FieldGroup>
					<PasswordFieldsGroup
						control={form.control}
						disabled={isLoadingResetPassword}
					/>

					<Field>
						<Button type="submit" disabled={isLoadingResetPassword}>
							Сбросить пароль
						</Button>
					</Field>
				</FieldGroup>
			</form>
		</WrapperCard>
	)
}
