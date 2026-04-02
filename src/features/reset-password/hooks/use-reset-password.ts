import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { type TPasswordWithConfirmationSchema } from '@/shared/model'
import { Route } from '@/shared/values'

import { resetPasswordService } from '../api'

interface IUseResetPasswordOptions {
	onSuccess?: () => void
}

export function useResetPassword(
	token: string,
	options?: IUseResetPasswordOptions
) {
	const router = useRouter()

	const { mutate: resetPassword, isPending: isLoadingResetPassword } =
		useMutation({
			mutationKey: ['reset-password', token],
			mutationFn: (values: TPasswordWithConfirmationSchema) =>
				resetPasswordService.resetPassword(token, values.password),
			onSuccess() {
				options?.onSuccess?.()
				toast.success('Пароль успешно сброшен!')

				router.replace(Route.Home)
			},
			onError(error) {
				console.error('Password refresh error:', error)
				toast.error('Что-то пошло не так, попробуйте еще раз')
			}
		})

	return { resetPassword, isLoadingResetPassword }
}
