import { z } from 'zod'

export const LoginSchema = z.object({
	email: z.email('Невалидный email'),

	password: z.string().min(1, {
		message: 'Обязательное поле'
	})
})

export type TLoginSchema = z.infer<typeof LoginSchema>
