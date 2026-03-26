import { NextRequest, NextResponse } from 'next/server'

import {
	HEADER_AUTH_VALID,
	HEADER_COOKIE,
	preserveSetCookies
} from '@/shared/proxy'

export function setAuthData(
	request: NextRequest,
	response: NextResponse,
	valid: boolean,
	cookieString?: string
): NextResponse {
	// Cannot be obtained in the server component
	request.headers.set(HEADER_AUTH_VALID, valid ? 'true' : 'false')

	const newHeaders = new Headers(request.headers)
	if (cookieString) {
		newHeaders.set(HEADER_COOKIE, cookieString)
	} else {
		newHeaders.delete(HEADER_COOKIE)
	}

	const newResponse = NextResponse.next({
		request: { headers: newHeaders }
	})
	preserveSetCookies(response, newResponse)

	return newResponse
}
