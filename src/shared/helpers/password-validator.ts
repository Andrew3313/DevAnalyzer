import { z } from 'zod'

import {
	HAS_DIGIT,
	HAS_UPPERCASE,
	LATIN_ALPHANUMERIC_SYMBOLS
} from '@/shared/values'

interface IPasswordValidatorOptions {
	min?: number
	allowedCharsMessage?: string
	uppercaseMessage?: string
	digitMessage?: string
}

export function passwordValidator(options?: IPasswordValidatorOptions) {
	const {
		min = 8,
		allowedCharsMessage = 'Только латиница, цифры и спецсимволы',
		uppercaseMessage = 'Нужна хотя бы одна заглавная буква',
		digitMessage = 'Нужна хотя бы одна цифра'
	} = options ?? {}

	return z
		.string()
		.min(min, `Минимум ${min} символов`)
		.regex(LATIN_ALPHANUMERIC_SYMBOLS, allowedCharsMessage)
		.regex(HAS_UPPERCASE, uppercaseMessage)
		.regex(HAS_DIGIT, digitMessage)
}
