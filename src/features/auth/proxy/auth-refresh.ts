import { decodeJwt } from 'jose'
import { NextRequest, NextResponse } from 'next/server'

import { defineProxy } from '@/shared/proxy'
import { getCookieOptions, StorageKey } from '@/shared/values'

import { authService } from '../api'

const CLEAR_COOKIE_OPTIONS = getCookieOptions({ maxAge: 0 })

export const AuthRefresh = defineProxy({
	global: true,
	handler: async (req: NextRequest, res: NextResponse) => {
		const accessToken = req.cookies.get(StorageKey.AccessToken)?.value
		const refreshToken = req.cookies.get(StorageKey.RefreshToken)?.value

		if (!accessToken || !refreshToken) {
			res.cookies.set(StorageKey.AccessToken, '', CLEAR_COOKIE_OPTIONS)
			res.cookies.set(StorageKey.RefreshToken, '', CLEAR_COOKIE_OPTIONS)

			return res
		}

		if (isTokenValid(accessToken)) {
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

			res.cookies.set(StorageKey.AccessToken, '', CLEAR_COOKIE_OPTIONS)
			res.cookies.set(StorageKey.RefreshToken, '', CLEAR_COOKIE_OPTIONS)
		}

		return res
	}
})

function isTokenValid(token: string, clockSkewSeconds = 30): boolean {
	try {
		const payload = decodeJwt(token) as { exp?: number }

		if (!payload.exp) return false

		return payload.exp * 1000 > Date.now() - clockSkewSeconds * 1000
	} catch {
		return false
	}
}
