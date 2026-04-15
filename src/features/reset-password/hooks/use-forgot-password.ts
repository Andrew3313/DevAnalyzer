import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { resetPasswordService } from '../api'

export function useForgotPassword() {
	const { mutate: forgotPassword, isPending: isSendingEmail } = useMutation({
		mutationKey: ['forgot-password'],
		mutationFn: resetPasswordService.forgotPassword,
		onSuccess: () => {
			toast.success(
				'Если указанный email зарегистрирован в системе, на него отправлено письмо с инструкциями'
			)
		},
		onError: (error) => {
			console.error('Forgot password error:', error)
			toast.error('Не удалось отправить письмо. Попробуйте позже')
		}
	})

	return { forgotPassword, isSendingEmail }
}
