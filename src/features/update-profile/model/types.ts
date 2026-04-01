import { UserRole } from '@/entities/user/values'
import { type IBaseFormField } from '@/shared/model'

export interface IUpdateProfileFormField<Schema> extends Omit<
	IBaseFormField<Schema>,
	'placeholder'
> {
	showIf?: (role: UserRole) => boolean
}
