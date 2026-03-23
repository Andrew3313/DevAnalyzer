import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Route } from '@/shared/values'

import { authService } from '../api'
import { type TLoginSchema } from '../model'

interface IUseLoginOptions {
	onSuccess?: () => void
}

export function useLogin(options?: IUseLoginOptions) {
	const router = useRouter()

	const { mutate: login, isPending: isLoadingLogin } = useMutation({
		mutationKey: ['login'],
		mutationFn: (values: TLoginSchema) => authService.login(values),
		onSuccess: () => {
			options?.onSuccess?.()
			toast.success('Вы успешно вошли в аккаунт!')
			router.push(Route.Home)
		},
		onError: (error) => {
			console.error('Login error:', error)
			toast.error(
				`Произошла ошибка. Проверьте введенные данные и попробуйте ещё раз.`
			)
		}
	})

	return { login, isLoadingLogin }
}
