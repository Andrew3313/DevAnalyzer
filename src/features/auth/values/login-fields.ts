import { type IBaseFormField } from '@/shared/model'

import { type TLoginSchema } from '../model'

export const LOGIN_FIELDS: ReadonlyArray<IBaseFormField<TLoginSchema>> = [
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
