import { decodeJwt } from 'jose'
import { NextRequest, NextResponse } from 'next/server'

import { defineProxy } from '@/shared/proxy'
import { getCookieOptions, Route, StorageKey } from '@/shared/values'

import { authService } from '../api'

const PUBLIC_AUTH_PAGES: Route[] = [Route.Login, Route.Register]

export const AuthProxy = defineProxy({
	global: true,
	handler: async (req: NextRequest, res: NextResponse) => {
		const pathname = req.nextUrl.pathname
		const isAuthPage = PUBLIC_AUTH_PAGES.includes(pathname as Route)

		const accessToken = req.cookies.get(StorageKey.AccessToken)?.value
		const refreshToken = req.cookies.get(StorageKey.RefreshToken)?.value

		const isAccessTokenValid = accessToken
			? isTokenValid(accessToken)
			: false

		if (isAccessTokenValid && isAuthPage) {
			return NextResponse.redirect(new URL(Route.Home, req.url))
		}

		if (!accessToken || !refreshToken || isAccessTokenValid) {
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

			if (isAuthPage) {
				return NextResponse.redirect(new URL(Route.Home, req.url))
			}
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

function isTokenValid(token: string, clockSkewSeconds = 30): boolean {
	try {
		const payload = decodeJwt(token) as { exp?: number }

		if (!payload.exp) return false

		return payload.exp * 1000 > Date.now() - clockSkewSeconds * 1000
	} catch {
		return false
	}
}
