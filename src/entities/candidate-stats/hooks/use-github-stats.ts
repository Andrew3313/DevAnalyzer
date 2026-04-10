import { useQuery } from '@tanstack/react-query'

import { fetchGithubStats } from '../api'

export function useGithubStats(username: string) {
	const { data, isLoading, error } = useQuery({
		queryKey: ['github-stats', username],
		queryFn: () => fetchGithubStats(username),
		enabled: !!username,
		staleTime: 60 * 1000 * 10
	})

	return {
		stats: data,
		isLoadingStats: isLoading,
		statsError: error
	}
}
