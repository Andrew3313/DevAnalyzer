import { type LucideProps } from 'lucide-react'

import { UserRole } from '@/entities/user/values'
import { Route } from '@/shared/values'

import type { ForwardRefExoticComponent, RefAttributes } from 'react'

export interface IProfileTab {
	href: Route
	label: string
	icon?: ForwardRefExoticComponent<
		Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
	>
	roles: UserRole[]
}
