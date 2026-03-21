import { NextResponse } from 'next/server'

export function preserveSetCookies(
	source: NextResponse,
	target: NextResponse
): void {
	source.headers.getSetCookie().forEach((cookie) => {
		target.headers.append('Set-Cookie', cookie)
	})
}
