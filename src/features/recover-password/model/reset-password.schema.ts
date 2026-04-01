import { z } from 'zod'

import { passwordValidator } from '@/shared/helpers'

export const resetPasswordSchema = z
	.object({
		newPassword: passwordValidator(),
		confirmNewPassword: z.string().min(1, 'Обязательное поле')
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmNewPassword']
	})

export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>
