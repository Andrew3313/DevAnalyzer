import { getEnv } from '@/shared/helpers'

import { FetchClient } from './fetch-client'

export const apiClient = new FetchClient(
	getEnv('NEXT_PUBLIC_API_URL', 'https://178.154.209.175.nip.io'),
	{},
	'include'
)
