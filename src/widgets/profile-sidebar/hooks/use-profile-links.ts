import { usePathname } from 'next/navigation'

import { UserRole } from '@/entities/user/values'

import { PROFILE_LINKS } from '../values'

const getProfileLinks = (role: UserRole) =>
	PROFILE_LINKS.filter((tab) => tab.roles.includes(role))

export function useProfileLinks(role: UserRole) {
	const currentPath = usePathname()

	const allowedLinks = getProfileLinks(role)
	const activeLink =
		allowedLinks.find((tab) => tab.href === currentPath)?.href ?? null

	return {
		allowedLinks,
		activeLink,
		currentPath
	}
}
