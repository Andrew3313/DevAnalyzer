import { UserRole } from '@/entities/user/values'

import type { IUpdateProfileFormField, TUpdateProfileSchema } from '../model'

export const UPDATE_PROFILE_FIELDS: ReadonlyArray<
	IUpdateProfileFormField<TUpdateProfileSchema>
> = [
	{
		name: 'lastName',
		label: 'Фамилия',
		type: 'text'
	},
	{
		name: 'firstName',
		label: 'Имя',
		type: 'text'
	},
	{
		name: 'patronymic',
		label: 'Отчество',
		type: 'text'
	},
	{
		name: 'company',
		label: 'Компания',
		type: 'text',
		showIf: (role) => role !== UserRole.USER
	},
	{
		name: 'position',
		label: 'Должность',
		type: 'text',
		showIf: (role) => role !== UserRole.USER
	}
]
