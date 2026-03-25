import { UserRole } from '../values'

export interface IUser {
	id: number
	email: string
	firstName: string
	patronymic: string
	lastName: string
	role: UserRole
	company: string
	position: string
}

export type TUpdateUserInfoApiRequest = Partial<
	Omit<IUser, 'id' | 'role' | 'email'>
>
