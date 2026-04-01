import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Route } from '@/shared/values'

import { recoverPasswordService } from '../api'
import { type TResetPasswordSchema } from '../model'

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
			mutationFn: (values: TResetPasswordSchema) =>
				recoverPasswordService.resetPassword(token, values.newPassword),
			onSuccess() {
				options?.onSuccess?.()
				toast.success('Пароль успешно обновлен!')
				router.replace(Route.Home)
			},
			onError(error) {
				console.error('Password refresh error:', error)
				toast.error('Что-то пошло не так, попробуйте еще раз.')
			}
		})

	return { resetPassword, isLoadingResetPassword }
}
