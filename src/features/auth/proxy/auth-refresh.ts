import { NextRequest, NextResponse } from 'next/server'

import {
	buildCookieStringFromSetCookies,
	getCookieOptions,
	isTokenValid
} from '@/shared/helpers'
import { defineProxy } from '@/shared/proxy'
import { StorageKey } from '@/shared/values'

import { authService } from '../api'
import { setAuthData } from './set-auth-data'

const CLEAR_COOKIE_OPTIONS = getCookieOptions({ maxAge: 0 })

export const AuthRefresh = defineProxy({
	global: true,
	handler: async (request: NextRequest, response: NextResponse) => {
		const accessToken = request.cookies.get(StorageKey.AccessToken)?.value
		const refreshToken = request.cookies.get(StorageKey.RefreshToken)?.value

		if (!refreshToken) {
			response.cookies.set(
				StorageKey.AccessToken,
				'',
				CLEAR_COOKIE_OPTIONS
			)
			response.cookies.set(
				StorageKey.RefreshToken,
				'',
				CLEAR_COOKIE_OPTIONS
			)

			return setAuthData(request, response, false)
		}

		if (accessToken && isTokenValid(accessToken)) {
			const currentCookie = request.headers.get('cookie') || ''

			return setAuthData(request, response, true, currentCookie)
		}

		const cookieHeader = request.headers.get('cookie') || ''
		try {
			const refreshResponse = await authService.refresh(cookieHeader)
			if (!refreshResponse.ok) {
				throw new Error(
					`Refresh failed with status ${refreshResponse.status}`
				)
			}

			const setCookies = refreshResponse.headers.getSetCookie()
			setCookies.forEach((cookie) => {
				response.headers.append('Set-Cookie', cookie)
			})

			const newCookieString = buildCookieStringFromSetCookies(setCookies)

			return setAuthData(request, response, true, newCookieString)
		} catch (error) {
			console.error('Refresh failed', error)

			response.cookies.set(
				StorageKey.AccessToken,
				'',
				CLEAR_COOKIE_OPTIONS
			)
			response.cookies.set(
				StorageKey.RefreshToken,
				'',
				CLEAR_COOKIE_OPTIONS
			)

			return setAuthData(request, response, false)
		}
	}
})
