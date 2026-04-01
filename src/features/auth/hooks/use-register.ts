import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Route } from '@/shared/values'

import { authService } from '../api'

import type { TRegisterApiRequest, TRegisterSchema } from '../model'

const toRegisterApiRequest = (data: TRegisterSchema): TRegisterApiRequest => ({
	email: data.email,
	password: data.password,
	firstName: data.firstName,
	lastName: data.lastName,
	patronymic: data.patronymic,
	company: data.company ?? '',
	position: data.position ?? ''
})

export interface IUseRegisterOptions {
	onSuccess?: () => void
}

export function useRegister(options?: IUseRegisterOptions) {
	const router = useRouter()

	const { mutate: register, isPending: isLoadingRegister } = useMutation({
		mutationKey: ['register'],
		mutationFn: (values: TRegisterSchema) =>
			authService.register(toRegisterApiRequest(values)),
		onSuccess: () => {
			options?.onSuccess?.()
			toast.success('Вы успешно зарегистрировались! Войдите в аккаунт')

			router.push(Route.Login)
		},
		onError: (error) => {
			console.error('Register error:', error)
			toast.error(`Произошла ошибка. Пожалуйста, попробуйте ещё раз`)
		}
	})

	return { register, isLoadingRegister }
}
