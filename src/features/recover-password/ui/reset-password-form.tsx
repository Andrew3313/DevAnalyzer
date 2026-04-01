'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { WrapperCard } from '@/shared/ui'
import {
	Button,
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	Input
} from '@/shared/ui/kit'
import { Route } from '@/shared/values'

import { useResetPassword } from '../hooks'
import { resetPasswordSchema, type TResetPasswordSchema } from '../model'
import { RESET_PASSWORD_FIELDS } from '../values'

const INITIAL_FORM_STATE: TResetPasswordSchema = {
	newPassword: '',
	confirmNewPassword: ''
}

interface IResetPasswordFormProps {
	token: string
}

export function ResetPasswordForm({ token }: IResetPasswordFormProps) {
	const form = useForm<TResetPasswordSchema>({
		resolver: zodResolver(resetPasswordSchema),
		mode: 'onTouched',
		defaultValues: INITIAL_FORM_STATE
	})

	const { resetPassword, isLoadingResetPassword } = useResetPassword(token, {
		onSuccess: () => {
			form.reset()
		}
	})

	const handleSubmit = (values: TResetPasswordSchema) => resetPassword(values)

	return (
		<WrapperCard
			title="Сброс пароля"
			footerLinkLabel="На главную ->"
			footerLinkHref={Route.Home}
		>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<FieldGroup>
					{RESET_PASSWORD_FIELDS.map((formField) => (
						<Controller
							key={formField.name}
							name={formField.name}
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor={field.name}>
										{formField.label}
									</FieldLabel>
									<Input
										{...field}
										id={field.name}
										aria-invalid={fieldState.invalid}
										type={formField.type}
										placeholder={formField.placeholder}
										disabled={isLoadingResetPassword}
									/>
									{fieldState.invalid && (
										<FieldError
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							)}
						/>
					))}

					<Field>
						<Button type="submit" disabled={isLoadingResetPassword}>
							{isLoadingResetPassword
								? 'Обновление...'
								: 'Обновить пароль'}
						</Button>
					</Field>
				</FieldGroup>
			</form>
		</WrapperCard>
	)
}
