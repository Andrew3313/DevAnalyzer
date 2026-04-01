import { UserRole } from '@/entities/user/values'
import { type IBaseFormField } from '@/shared/model'

import { type TRegisterSchema } from './register.schema'

export interface IRegisterFormField<Schema> extends IBaseFormField<Schema> {
	showIf?: (role: UserRole) => boolean
}

export type TRegisterApiRequest = Required<
	Omit<TRegisterSchema, 'role' | 'confirmPassword'>
>
