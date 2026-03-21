import { UserRole } from '@/entities/user/values'

import type { TRegisterSchema, IFormField } from '../model'

export const REGISTER_FIELDS: ReadonlyArray<IFormField<TRegisterSchema>> = [
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
		label: 'Отчество (при наличии)',
		placeholder: 'Иванович',
		type: 'text'
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
		name: 'email',
		label: 'Email',
		placeholder: 'your@email.com',
		type: 'email'
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
