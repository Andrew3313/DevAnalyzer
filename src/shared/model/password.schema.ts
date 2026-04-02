import { z } from 'zod'

import { passwordValidator } from '@/shared/helpers'

export const passwordSchema = passwordValidator()
export const confirmPasswordSchema = z.string().min(1, 'Обязательное поле')

export const passwordWithConfirmationSchema = z
	.object({
		password: passwordSchema,
		confirmPassword: confirmPasswordSchema
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmNewPassword']
	})

export type TPasswordWithConfirmationSchema = z.infer<
	typeof passwordWithConfirmationSchema
>
