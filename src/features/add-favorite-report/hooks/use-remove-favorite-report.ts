import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { favoriteService } from '../api'
import { favoriteReportStatusQueryKey } from './use-favorite-report-status'

export function useRemoveFavoriteReport(requestId: string) {
	const queryClient = useQueryClient()

	const { mutate: removeFromFavorites, isPending: isRemovingFromFavorites } =
		useMutation({
			mutationKey: ['remove-favorite-report', requestId],
			mutationFn: () => favoriteService.remove(requestId),
			onSuccess: async () => {
				toast.success('Отчет удален из избранного')

				await queryClient.invalidateQueries({
					queryKey: favoriteReportStatusQueryKey(requestId)
				})
			},
			onError: (error) => {
				console.error('Remove favorite report error:', error)

				toast.error('Не получилось удалить из избранного')
			}
		})

	return { removeFromFavorites, isRemovingFromFavorites }
}
