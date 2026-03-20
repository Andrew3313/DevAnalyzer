import { getEnv } from '@/shared/helpers'

import { FetchClient } from './fetch-client'

export const apiClient = new FetchClient(
	getEnv('NEXT_PUBLIC_API_URL', 'http://localhost:8080/api'),
	{},
	'include'
)
