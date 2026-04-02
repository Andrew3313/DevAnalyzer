import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { userService } from '@/entities/user/api'
import { type TPasswordWithConfirmationSchema } from '@/shared/model'

interface IUseUpdatePasswordOptions {
	onSuccess?: () => void
}

export function useUpdatePassword(options?: IUseUpdatePasswordOptions) {
	const { mutate: updatePassword, isPending: isUpdatingPassword } =
		useMutation({
			mutationKey: ['update-password'],
			mutationFn: (values: TPasswordWithConfirmationSchema) =>
				userService.changePassword(values.password),
			onSuccess: () => {
				options?.onSuccess?.()
				toast.success('Пароль успешно обновлен!', {
					position: 'bottom-center'
				})
			},
			onError(error) {
				console.error('Error update profile:', error)
				toast.error('Что-то пошло не так, попробуйте еще раз', {
					position: 'bottom-center'
				})
			}
		})

	return { updatePassword, isUpdatingPassword }
}
