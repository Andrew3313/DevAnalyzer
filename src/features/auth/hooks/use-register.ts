import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Route } from '@/shared/values'

import { authService } from '../api'
import { type TRegisterSchema } from '../model'

export function useRegister() {
	const router = useRouter()

	const { mutate: register, isPending: isLoadingRegister } = useMutation({
		mutationKey: ['register'],
		mutationFn: (values: TRegisterSchema) => authService.register(values),
		onSuccess: () => {
			router.push(Route.Login)
			toast.success('Вы успешно зарегистрировались! Войдите в аккаунт.')
		},
		onError: (error) => {
			console.error('Register error:', error)
			toast.error(`Произошла ошибка. Пожалуйста, попробуйте ещё раз.`)
		}
	})

	return { register, isLoadingRegister }
}
