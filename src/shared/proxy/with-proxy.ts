import { NextRequest, NextResponse } from 'next/server'

import type { IProxy } from './types'

export async function withProxy(
	request: NextRequest,
	response: NextResponse,
	proxies: IProxy[] = []
) {
	const pathname = request.nextUrl.pathname
	let currentResponse = response

	for (const { paths, handler, global } of proxies) {
		const shouldRun =
			global || paths.some((path) => pathname.startsWith(path))

		if (!shouldRun) continue

		const result = await handler(request, currentResponse)

		if (result instanceof NextResponse) {
			currentResponse = result
		}
	}

	return currentResponse
}
