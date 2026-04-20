import { useInfiniteQuery } from '@tanstack/react-query'

import { fetchFavoriteReports } from '../api'

export function useFavoriteReports(limit: number) {
	const {
		data: reports,
		error: reportsError,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading: isLoadingReports
	} = useInfiniteQuery({
		queryKey: ['favorite-reports', limit],
		queryFn: ({ pageParam }) =>
			fetchFavoriteReports({
				limit,
				offset: pageParam
			}),
		initialPageParam: 0,
		getNextPageParam: (lastPage, allPages) =>
			lastPage.length === limit ? allPages.length * limit : undefined,
		select: (result) => result.pages.flat(),
		staleTime: 0
	})

	return {
		reports,
		reportsError,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoadingReports
	}
}
