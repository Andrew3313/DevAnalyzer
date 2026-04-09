import { useQuery } from '@tanstack/react-query'

import { fetchBasicStats } from '../api'

export function useBasicStats(username: string) {
	const { data, isLoading, error } = useQuery({
		queryKey: ['basic-stats', username],
		queryFn: () => fetchBasicStats(username),
		enabled: !!username,
		staleTime: 60 * 1000 * 10
	})

	return {
		stats: data,
		isLoadingStats: isLoading,
		statsError: error
	}
}
