import { NextRequest, NextResponse } from 'next/server'

import {
	defineProxy,
	HEADER_AUTH_VALID,
	preserveSetCookies
} from '@/shared/proxy'
import { Route } from '@/shared/values'

import { PRIVATE_PATH_PREFIXES, PUBLIC_AUTH_PAGES } from '../values'

export const AuthRedirectGuard = defineProxy({
	global: true,
	handler: async (request: NextRequest, response: NextResponse) => {
		const pathname = request.nextUrl.pathname

		const isAuthPage = PUBLIC_AUTH_PAGES.includes(pathname as Route)
		const isPrivateRoute = PRIVATE_PATH_PREFIXES.some((prefix) =>
			pathname.startsWith(prefix)
		)

		const authValid = request.headers.get(HEADER_AUTH_VALID) === 'true'

		if (authValid && isAuthPage) {
			const redirect = NextResponse.redirect(
				new URL(Route.Home, request.url)
			)
			preserveSetCookies(response, redirect)

			return redirect
		}

		if (!authValid && isPrivateRoute) {
			const redirect = NextResponse.redirect(
				new URL(Route.Login, request.url)
			)
			preserveSetCookies(response, redirect)

			return redirect
		}

		return response
	}
})
