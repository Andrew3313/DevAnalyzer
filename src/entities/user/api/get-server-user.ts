import { headers } from 'next/headers'

import { HEADER_COOKIE } from '@/shared/proxy'

import { userService } from './user-service'

export async function getServerUser() {
	const cookieString = (await headers()).get(HEADER_COOKIE)

	if (!cookieString) return null

	try {
		return await userService.getSelf({ Cookie: cookieString })
	} catch (error) {
		console.error('Failed to fetch user:', error)

		return null
	}
}
