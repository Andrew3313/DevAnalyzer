import { useQuery } from '@tanstack/react-query'

import { fetchAllRepositories } from '@/entities/repository/api'

export function useTopRepositories(username: string) {
	const {
		data: repositories,
		isLoading: isLoadingRepositories,
		error: repositoriesError
	} = useQuery({
		queryKey: ['top-repositories', username],
		queryFn: () => fetchAllRepositories(username),
		select: (data) => data.slice(0, 4),
		enabled: !!username,
		staleTime: 60 * 1000 * 10
	})

	return {
		repositories,
		isLoadingRepositories,
		repositoriesError
	}
}
