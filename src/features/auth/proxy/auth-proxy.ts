import { NextRequest, NextResponse } from 'next/server'

import { defineProxy } from '@/shared/proxy'
import { getCookieOptions, StorageKey } from '@/shared/values'

import { authService } from '../api'
import { isTokenValid } from '../helpers'

export const AuthProxy = defineProxy({
	global: true,
	handler: async (req: NextRequest, res: NextResponse) => {
		const accessToken = req.cookies.get(StorageKey.AccessToken)?.value
		const refreshToken = req.cookies.get(StorageKey.RefreshToken)?.value

		if (!accessToken || !refreshToken || isTokenValid(accessToken)) {
			return res
		}

		const cookieHeader = req.headers.get('cookie') || ''

		try {
			const refreshResponse = await authService.refresh(cookieHeader)

			if (!refreshResponse.ok) {
				throw new Error(
					`Refresh failed with status ${refreshResponse.status}`
				)
			}

			const setCookieHeaders = refreshResponse.headers.getSetCookie()
			setCookieHeaders.forEach((cookie) => {
				res.headers.append('Set-Cookie', cookie)
			})
		} catch (error) {
			console.error('Refresh failed', error)

			res.cookies.set(
				StorageKey.AccessToken,
				'',
				getCookieOptions({ maxAge: 0 })
			)
			res.cookies.set(
				StorageKey.RefreshToken,
				'',
				getCookieOptions({ maxAge: 0 })
			)
		}

		return res
	}
})
