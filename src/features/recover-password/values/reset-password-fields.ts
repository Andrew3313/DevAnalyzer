import { type IBaseFormField } from '@/shared/model'

import { type TResetPasswordSchema } from '../model'

export const RESET_PASSWORD_FIELDS: ReadonlyArray<
	IBaseFormField<TResetPasswordSchema>
> = [
	{
		name: 'newPassword',
		label: 'Новый пароль',
		placeholder: '••••••••',
		type: 'password'
	},
	{
		name: 'confirmNewPassword',
		label: 'Подтвердите пароль',
		placeholder: '••••••••',
		type: 'password'
	}
]
