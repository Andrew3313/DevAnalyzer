import { apiClient } from '@/shared/api'

import { type IRepositoryList } from '../model'

export const fetchAllRepositories = async (
	username: string
): Promise<IRepositoryList> =>
	apiClient.request(`/api/github/${username}/repos`)
