'use client'

import { toast } from 'sonner'

import { Button } from '@/shared/ui/kit'

import { useForgotPassword } from '../hooks'

interface IForgotButtonProps extends Omit<
	React.ComponentProps<typeof Button>,
	'onClick' | 'disabled'
> {
	email: string
	validateEmail: (email: string) => boolean | Promise<boolean>
	isLoading?: boolean
}

export function ForgotButton({
	email,
	validateEmail,
	isLoading = false,
	...buttonProps
}: IForgotButtonProps) {
	const { forgotPassword, isSendingEmail } = useForgotPassword()

	const handleReset = async () => {
		try {
			const isValid = await validateEmail(email)
			if (!isValid) {
				toast.error('Пожалуйста, введите корректный email.')
				return
			}

			forgotPassword(email)
		} catch (error) {
			console.error('Validate email error:', error)
			toast.error(
				'Что-то пошло не так. Проверьте введенный email и попробуйте ещё раз.'
			)
		}
	}

	const disabled = isLoading || isSendingEmail || !email.trim()

	return <Button disabled={disabled} onClick={handleReset} {...buttonProps} />
}
