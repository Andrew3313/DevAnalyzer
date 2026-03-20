import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Route } from '@/shared/values'

import { authService } from '../api'
import { type TLoginSchema } from '../model'

export function useLogin() {
	const router = useRouter()

	const { mutate: login, isPending: isLoadingLogin } = useMutation({
		mutationKey: ['login'],
		mutationFn: (values: TLoginSchema) => authService.login(values),
		onSuccess: () => {
			router.push(Route.Home)
			toast.success('Вы успешно вошли в аккаунт!')
		},
		onError: (error) => {
			console.error('Login error:', error)
			toast.error(`Error: ${error.message}`)
		}
	})

	return { login, isLoadingLogin }
}
