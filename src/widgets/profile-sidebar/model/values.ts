import { Heart, LockKeyhole, User, History } from 'lucide-react'

import { UserRole } from '@/entities/user/values'
import { Route } from '@/shared/values'

import { type IProfileLink } from './types'

export const PROFILE_LINKS: ReadonlyArray<IProfileLink> = [
	{
		href: Route.Profile,
		label: 'Профиль',
		icon: User,
		roles: [UserRole.USER, UserRole.HR, UserRole.ADMIN]
	},
	{
		href: Route.ReportsHistory,
		label: 'Отчёты',
		icon: History,
		roles: [UserRole.HR, UserRole.ADMIN]
	},
	{
		href: Route.Favorites,
		label: 'Избранное',
		icon: Heart,
		roles: [UserRole.HR, UserRole.ADMIN]
	},
	{
		href: Route.Security,
		label: 'Безопасность',
		icon: LockKeyhole,
		roles: [UserRole.USER, UserRole.HR, UserRole.ADMIN]
	}
]
