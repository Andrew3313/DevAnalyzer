import { NextRequest, NextResponse } from 'next/server'

import { AuthProxy } from '@/features/auth/proxy'
import { type IProxy, withProxy } from '@/shared/proxy'
import { Route, ROUTES_LIST } from '@/shared/values'

const PROXIES: IProxy[] = [AuthProxy]

export async function proxy(request: NextRequest) {
	const response = NextResponse.next()

	const isPage = ROUTES_LIST.includes(request.nextUrl.pathname as Route)
	const nextResponse = isPage
		? await withProxy(request, response, PROXIES)
		: null

	return nextResponse || response
}

export const config = {
	matcher: ['/:path*']
}
