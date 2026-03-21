import type { TLoginSchema, IFormField } from '../model'

export const LOGIN_FIELDS: ReadonlyArray<IFormField<TLoginSchema>> = [
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
