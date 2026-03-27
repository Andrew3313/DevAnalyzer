import { z } from 'zod'

const HAS_DIGIT = /[0-9]/
const HAS_UPPERCASE = /[A-Z]/

export const LATIN_ALPHANUMERIC_SYMBOLS =
	/^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/

interface IPasswordValidatorOptions {
	min?: number
	max?: number
	allowedCharsMessage?: string
	uppercaseMessage?: string
	digitMessage?: string
}

export function passwordValidator(options?: IPasswordValidatorOptions) {
	const {
		min = 8,
		max = 100,
		allowedCharsMessage = 'Только латиница, цифры и спецсимволы',
		uppercaseMessage = 'Нужна хотя бы одна заглавная буква',
		digitMessage = 'Нужна хотя бы одна цифра'
	} = options ?? {}

	return z
		.string()
		.min(min, `Минимум ${min} символов`)
		.max(max, `Максимум ${max} символов`)
		.regex(LATIN_ALPHANUMERIC_SYMBOLS, allowedCharsMessage)
		.regex(HAS_UPPERCASE, uppercaseMessage)
		.regex(HAS_DIGIT, digitMessage)
}
