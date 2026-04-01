'use server'

import { headers } from 'next/headers'
import { cache } from 'react'

import { unquote } from '@/shared/helpers'
import { HEADER_COOKIE } from '@/shared/proxy'

import { userService } from './user-service'

export const getServerUserData = cache(async () => {
	const cookieString = (await headers()).get(HEADER_COOKIE)
	if (!cookieString) return { user: null, avatarUrl: null }

	const [user, avatarRaw] = await Promise.all([
		userService.getSelf({ Cookie: cookieString }).catch((err) => {
			console.error('Failed to fetch user:', err)

			return null
		}),
		userService.getAvatarUrl({ Cookie: cookieString }).catch((err) => {
			console.error('Failed to fetch avatar URL:', err)

			return null
		})
	])

	const avatarUrl = avatarRaw ? unquote(avatarRaw) : null

	return { user, avatarUrl }
})
