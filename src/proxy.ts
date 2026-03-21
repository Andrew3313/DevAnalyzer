import { NextRequest, NextResponse } from 'next/server'

import { AuthProxy } from '@/features/auth/proxy'
import { withProxy, type IProxy } from '@/shared/proxy'
import { Route, ROUTES_LIST } from '@/shared/values'

const PROXIES: IProxy[] = [AuthProxy]

export async function proxy(req: NextRequest) {
	const response = NextResponse.next()

	const isPage = ROUTES_LIST.includes(req.nextUrl.pathname as Route)
	const nextResponse = isPage ? await withProxy(req, response, PROXIES) : null

	return nextResponse || response
}

export const config = {
	matcher: ['/:path*']
}
