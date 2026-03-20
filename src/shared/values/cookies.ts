import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'

const COOKIE_DOMAIN = process.env.NEXT_PUBLIC_COOKIE_DOMAIN

export const baseCookieOptions: Partial<ResponseCookie> = {
	httpOnly: true,
	path: '/',
	secure: true,
	sameSite: 'none',
	...(COOKIE_DOMAIN ? { domain: COOKIE_DOMAIN } : {})
}

export const getCookieOptions = (
	extra?: Partial<ResponseCookie>
): Partial<ResponseCookie> => ({
	...baseCookieOptions,
	...extra
})
