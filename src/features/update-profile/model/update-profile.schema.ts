import { z } from 'zod'

import { NO_WHITESPACE } from '@/shared/values'

export const UpdateProfileSchema = z.object({
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

	company: z
		.string()
		.min(1, 'Укажите компанию')
		.max(100, 'Максимум 100 символов')
		.optional(),

	position: z
		.string()
		.min(1, 'Укажите должность')
		.max(100, 'Максимум 100 символов')
		.optional()
})

export type TUpdateProfileSchema = z.infer<typeof UpdateProfileSchema>
