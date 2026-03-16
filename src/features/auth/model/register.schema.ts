import { z } from 'zod'

import { passwordValidator } from '@/shared/helpers'

export const RegisterSchema = z
	.object({
		email: z.email('Невалидный email'),
		password: passwordValidator(),
		confirmPassword: z.string().min(1, 'Подтвердите пароль')
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword']
	})

export type TRegisterSchema = z.infer<typeof RegisterSchema>
