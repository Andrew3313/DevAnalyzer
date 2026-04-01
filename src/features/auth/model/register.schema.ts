import { z } from 'zod'

import { UserRole } from '@/entities/user/values'
import { isEmpty, passwordValidator } from '@/shared/helpers'
import { NO_WHITESPACE } from '@/shared/values'

export const RegisterSchema = z
	.object({
		role: z.enum(UserRole).optional(),

		firstName: z
			.string()
			.min(1, 'Введите имя')
			.max(30, 'Максимум 30 символов')
			.regex(NO_WHITESPACE, 'Должно быть одним словом'),

		lastName: z
			.string()
			.min(1, 'Введите фамилию')
			.max(50, 'Максимум 50 символов')
			.regex(NO_WHITESPACE, 'Должна быть одним словом'),

		patronymic: z
			.string()
			.max(50, 'Максимум 50 символов')
			.refine(
				(value) => !value || NO_WHITESPACE.test(value),
				'Должно быть одним словом'
			),

		company: z.string().max(100, 'Максимум 100 символов').optional(),
		position: z.string().max(100, 'Максимум 100 символов').optional(),

		email: z.email('Невалидный email'),

		password: passwordValidator(),
		confirmPassword: z.string().min(1, 'Обязательное поле')
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword']
	})
	.refine((data) => data.role, {
		message: 'Выберите тип аккаунта',
		path: ['role']
	})
	.superRefine((data, ctx) => {
		if (data.role === UserRole.HR) {
			if (isEmpty(data.company)) {
				ctx.addIssue({
					code: 'custom',
					message: 'Обязательное поле',
					path: ['company']
				})
			}

			if (isEmpty(data.position)) {
				ctx.addIssue({
					code: 'custom',
					message: 'Обязательное поле',
					path: ['position']
				})
			}
		}
	})

export type TRegisterSchema = z.infer<typeof RegisterSchema>
