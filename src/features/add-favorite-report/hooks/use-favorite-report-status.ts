import { useQuery } from '@tanstack/react-query'

import { favoriteService } from '../api'

export const favoriteReportStatusQueryKey = (requestId: string) => [
	'favorite-report-status',
	requestId
]

export function useFavoriteReportStatus(requestId: string, enabled = true) {
	const {
		data: isFavorite,
		isLoading: isLoadingFavoriteStatus,
		error: favoriteStatusError
	} = useQuery({
		queryKey: favoriteReportStatusQueryKey(requestId),
		queryFn: () => favoriteService.check(requestId),
		enabled: !!requestId && enabled
	})

	return {
		isFavorite,
		isLoadingFavoriteStatus,
		favoriteStatusError
	}
}
