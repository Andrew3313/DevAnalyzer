import z from 'zod'

import { passwordValidator } from '@/shared/helpers'

export const refreshPasswordSchema = z
	.object({
		newPassword: passwordValidator(),
		confirmNewPassword: z.string().min(1, 'Обязательное поле')
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmNewPassword']
	})

export type TRefreshPasswordSchema = z.infer<typeof refreshPasswordSchema>
