import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { getCookieOptions } from '@/shared/helpers'
import { StorageKey } from '@/shared/values'

export async function POST() {
	const cookieStore = await cookies()

	cookieStore.set(StorageKey.AccessToken, '', getCookieOptions({ maxAge: 0 }))
	cookieStore.set(
		StorageKey.RefreshToken,
		'',
		getCookieOptions({ maxAge: 0 })
	)

	return NextResponse.json({ success: true })
}
