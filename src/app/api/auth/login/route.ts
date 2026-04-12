import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { getCookieOptions, getEnv } from '@/shared/helpers'
import { StorageKey } from '@/shared/values'

export async function POST(request: NextRequest) {
	const body = await request.json()

	const apiUrl = getEnv(
		'NEXT_PUBLIC_API_URL',
		'https://178.154.209.175.nip.io'
	)

	const backendResponse = await fetch(`${apiUrl}/auth/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	})

	if (!backendResponse.ok) {
		const error = await backendResponse.text()
		return NextResponse.json(
			{ message: error },
			{ status: backendResponse.status }
		)
	}

	const setCookies = backendResponse.headers.getSetCookie()
	const cookieStore = await cookies()

	setCookies.forEach((cookieStr) => {
		const [nameValue] = cookieStr.split(';')
		const [name, value] = nameValue.split('=')
		const trimmedName = name.trim()

		if (
			trimmedName === StorageKey.AccessToken ||
			trimmedName === StorageKey.RefreshToken
		) {
			cookieStore.set(trimmedName, value, getCookieOptions())
		}
	})

	const data = await backendResponse.text()
	return new NextResponse(data || null, { status: 200 })
}
