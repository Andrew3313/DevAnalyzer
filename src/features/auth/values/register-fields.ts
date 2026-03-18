import { UserRole } from '@/entities/user/values'

import type { TRegisterSchema, TFormFields } from '../model'

export const REGISTER_FIELDS: Readonly<TFormFields<TRegisterSchema>> = [
	{
		name: 'lastName',
		label: 'Фамилия',
		placeholder: 'Иванов',
		type: 'text'
	},
	{
		name: 'firstName',
		label: 'Имя',
		placeholder: 'Иван',
		type: 'text'
	},
	{
		name: 'patronymic',
		label: 'Отчество',
		placeholder: 'Иванович',
		type: 'text'
	},
	{
		name: 'email',
		label: 'Email',
		placeholder: 'your@email.com',
		type: 'email'
	},
	{
		name: 'company',
		label: 'Компания',
		placeholder: 'Tech Solutions',
		type: 'text',
		showIf: (role) => role === UserRole.HR
	},
	{
		name: 'position',
		label: 'Должность',
		placeholder: 'HR Manager',
		type: 'text',
		showIf: (role) => role === UserRole.HR
	},
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
