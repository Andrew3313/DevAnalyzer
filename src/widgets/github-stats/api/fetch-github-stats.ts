import { type IGithubStats } from '@/entities/candidate-stats/model'
import { apiClient } from '@/shared/api'

export const fetchGithubStats = async (
	username: string
): Promise<IGithubStats> => apiClient.request(`/api/github/${username}`)
