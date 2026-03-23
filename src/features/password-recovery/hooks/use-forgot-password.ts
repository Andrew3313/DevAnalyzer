import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { passwordRecoveryService } from '../api'

export function useForgotPassword() {
	const { mutate: forgotPassword, isPending: isSendingEmail } = useMutation({
		mutationKey: ['forgot-password'],
		mutationFn: (email: string) =>
			passwordRecoveryService.forgotPassword(email),
		onSuccess: () => {
			toast.success(
				'На указанную почту отправлено письмо для сброса пароля.'
			)
		},
		onError: (error) => {
			console.error('Forgot password error:', error)
			toast.error('Не удалось отправить письмо. Попробуйте позже.')
		}
	})

	return { forgotPassword, isSendingEmail }
}
