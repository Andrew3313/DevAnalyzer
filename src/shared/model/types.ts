import { Keys } from '@/shared/helpers'

export interface IBaseFormField<Schema> {
	name: Keys<Schema>
	label: string
	placeholder: string
	type: string
}
