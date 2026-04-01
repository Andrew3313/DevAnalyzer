'use client'

import { useWatch, type UseFormReturn } from 'react-hook-form'

import { TLoginSchema } from '@/features/auth/model'
import { ForgotButton } from '@/features/recover-password/ui'

interface IForgotWrapperProps {
	form: UseFormReturn<TLoginSchema>
	isLoading: boolean
}

export function ForgotWrapper({ form, isLoading }: IForgotWrapperProps) {
	const emailValue = useWatch<TLoginSchema>({
		control: form.control,
		name: 'email'
	})

	const validateEmail = async () => form.trigger('email')

	return (
		<ForgotButton
			type="button"
			email={emailValue}
			validateEmail={validateEmail}
			isLoading={isLoading}
			variant="outline"
		>
			Забыли пароль?
		</ForgotButton>
	)
}
