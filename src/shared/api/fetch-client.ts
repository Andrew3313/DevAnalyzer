import type { TRequestOptions } from './types'

export class FetchClient {
	constructor(
		private baseUrl: string,
		private defaultHeaders: HeadersInit = {},
		private defaultCredentials: RequestCredentials = 'same-origin'
	) {}

	public async request(
		endpoint: string,
		options: TRequestOptions & { rawResponse: true }
	): Promise<Response>

	public async request<T = unknown>(
		endpoint: string,
		options?: TRequestOptions & { rawResponse?: false }
	): Promise<T>

	public async request<T = unknown>(
		endpoint: string,
		options: TRequestOptions = {}
	): Promise<T | Response> {
		const url = new URL(`${this.baseUrl}${endpoint}`)

		if (options.queryParams) {
			Object.entries(options.queryParams).forEach(([key, value]) =>
				url.searchParams.append(key, String(value))
			)
		}

		const {
			headers = {},
			nextOptions,
			rawResponse,
			...fetchOptions
		} = options

		const response = await fetch(url.toString(), {
			...fetchOptions,
			headers: {
				...this.defaultHeaders,
				...headers
			},
			credentials: this.defaultCredentials,
			...(nextOptions ? { next: nextOptions } : {})
		})

		if (rawResponse) {
			return response
		}

		if (!response.ok) {
			throw new Error(
				`HTTP error ${response.status} for ${url.toString()}`
			)
		}

		const contentType = response.headers.get('Content-Type') || ''

		if (contentType.includes('application/json')) {
			return (await response.json()) as T
		}

		return (await response.text()) as unknown as T
	}
}
