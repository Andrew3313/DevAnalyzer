import { z } from 'zod'

export const LoginSchema = z.object({
	email: z.email('Невалидный email'),

	password: z
		.string()
		.min(1, 'Обязательное поле')
		.max(100, 'Максимум 100 символов')
})

export type TLoginSchema = z.infer<typeof LoginSchema>
