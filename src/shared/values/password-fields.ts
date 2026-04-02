import type {
	IBaseFormField,
	TPasswordWithConfirmationSchema
} from '@/shared/model'

export const PASSWORD_FIELDS: ReadonlyArray<
	IBaseFormField<TPasswordWithConfirmationSchema>
> = [
	{
		name: 'password',
		label: 'Пароль',
		placeholder: '••••••••',
		type: 'password'
	},
	{
		name: 'confirmPassword',
		label: 'Подтвердите пароль',
		placeholder: '••••••••',
		type: 'password'
	}
]
