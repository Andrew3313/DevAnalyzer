import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { authService } from '../api'

interface IUseLoginOptions {
	onSuccess?: () => void
}

export function useLogin(options?: IUseLoginOptions) {
	const router = useRouter()

	const { mutate: login, isPending: isLoadingLogin } = useMutation({
		mutationKey: ['login'],
		mutationFn: authService.login,
		onSuccess: () => {
			options?.onSuccess?.()
			toast.success('Вы успешно вошли в аккаунт!')

			router.refresh()
		},
		onError: (error) => {
			console.error('Login error:', error)
			toast.error(
				'Произошла ошибка. Проверьте введенные данные и попробуйте ещё раз'
			)
		}
	})

	return { login, isLoadingLogin }
}
