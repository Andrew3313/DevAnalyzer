import { NextRequest, NextResponse } from 'next/server'

import { AuthRefresh, AuthRedirectGuard } from '@/features/auth/proxy'
import { withProxy, type IProxy } from '@/shared/proxy'

const PROXIES: IProxy[] = [AuthRefresh, AuthRedirectGuard]

export async function proxy(request: NextRequest) {
	const response = NextResponse.next()

	return withProxy(request, response, PROXIES)
}

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
	]
}
