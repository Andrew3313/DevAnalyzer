import type { TLoginSchema, TFormFields } from '../model'

export const LOGIN_FIELDS: Readonly<TFormFields<TLoginSchema>> = [
	{
		name: 'email',
		label: 'Email',
		placeholder: 'ivanov@example.com',
		type: 'email'
	},
	{
		name: 'password',
		label: 'Пароль',
		placeholder: '••••••••',
		type: 'password'
	}
]
