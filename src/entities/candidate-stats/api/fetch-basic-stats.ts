import { apiClient } from '@/shared/api'

import { type IBasicGithubStats } from '../model'

export const fetchBasicStats = async (
	username: string
): Promise<IBasicGithubStats> => apiClient.request(`/api/github/${username}`)
