import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { type IUser } from '@/entities/user/model'
import { Route } from '@/shared/values'

import { authService } from '../api'
import { type TRegisterSchema } from '../model'

export function useRegister() {
	const router = useRouter()

	const { mutate: register, isPending: isLoadingRegister } = useMutation({
		mutationKey: ['register'],
		mutationFn: (values: TRegisterSchema) => authService.register(values),
		onSuccess: (data: IUser) => {
			console.log(data)

			router.push(Route.Home)
			toast.success('Вы успешно зарегистрировались!')
		},
		onError: (error) => {
			console.error('Register error:', error)
			toast.error(`Произошла ошибка. Пожалуйста, попробуйте ещё раз.`)
		}
	})

	return { register, isLoadingRegister }
}
