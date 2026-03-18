import { UserRole } from '@/entities/user/values'
import { type Keys } from '@/shared/helpers'

export interface IFormField<Schema> {
	name: Keys<Schema>
	label: string
	placeholder: string
	type: string
	showIf?: (role: UserRole) => boolean
}

export type TFormFields<Schema> = IFormField<Schema>[]
