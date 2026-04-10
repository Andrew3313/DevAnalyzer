import { apiClient } from '@/shared/api'

import { type IGithubStats } from '../model'

export const fetchGithubStats = async (
	username: string
): Promise<IGithubStats> => apiClient.request(`/api/github/${username}`)
