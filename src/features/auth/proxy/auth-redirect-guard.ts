import { NextRequest, NextResponse } from 'next/server'

import { defineProxy, preserveSetCookies } from '@/shared/proxy'
import { Route, StorageKey } from '@/shared/values'

import { PRIVATE_PATH_PREFIXES, PUBLIC_AUTH_PAGES } from '../values'

export const AuthRedirectGuard = defineProxy({
	global: true,
	handler: async (req: NextRequest, res: NextResponse) => {
		const pathname = req.nextUrl.pathname

		const isAuthPage = PUBLIC_AUTH_PAGES.includes(pathname as Route)
		const isPrivateRoute = PRIVATE_PATH_PREFIXES.some((prefix) =>
			pathname.startsWith(prefix)
		)

		const accessToken = req.cookies.get(StorageKey.AccessToken)?.value

		if (accessToken && isAuthPage) {
			const redirect = NextResponse.redirect(new URL(Route.Home, req.url))
			preserveSetCookies(res, redirect)

			return redirect
		}

		if (!accessToken && isPrivateRoute) {
			const redirect = NextResponse.redirect(
				new URL(Route.Login, req.url)
			)
			preserveSetCookies(res, redirect)

			return redirect
		}

		return res
	}
})
