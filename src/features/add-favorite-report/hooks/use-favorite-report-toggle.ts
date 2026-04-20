import { useAddFavoriteReport } from './use-add-favorite-report'
import { useFavoriteReportStatus } from './use-favorite-report-status'
import { useRemoveFavoriteReport } from './use-remove-favorite-report'

interface IUseFavoriteReportToggleParams {
	requestId: string
	enabled?: boolean
	isReportLoading?: boolean
}

export function useFavoriteReportToggle({
	requestId,
	enabled = true,
	isReportLoading = false
}: IUseFavoriteReportToggleParams) {
	const {
		isFavorite: favoriteStatus,
		isLoadingFavoriteStatus,
		favoriteStatusError
	} = useFavoriteReportStatus(requestId, enabled && !isReportLoading)

	const { addToFavorites, isAddingToFavorites } =
		useAddFavoriteReport(requestId)
	const { removeFromFavorites, isRemovingFromFavorites } =
		useRemoveFavoriteReport(requestId)

	const isFavorite = favoriteStatus ?? false
	const isUpdatingFavorite = isAddingToFavorites || isRemovingFromFavorites
	const isLoadingFavoriteButton = isReportLoading || isLoadingFavoriteStatus

	const handleToggleFavorite = () => {
		if (isFavorite) {
			removeFromFavorites()
			return
		}

		addToFavorites()
	}

	return {
		state: {
			isFavorite,
			isLoadingFavoriteStatus,
			favoriteStatusError,
			isUpdatingFavorite,
			isLoadingFavoriteButton,
			isFavoriteButtonDisabled: !!favoriteStatusError
		},
		actions: {
			toggleFavorite: handleToggleFavorite
		}
	}
}
