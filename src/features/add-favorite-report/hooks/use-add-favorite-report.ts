import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { favoriteService } from '../api'
import { favoriteReportStatusQueryKey } from './use-favorite-report-status'

export function useAddFavoriteReport(requestId: string) {
	const queryClient = useQueryClient()

	const { mutate: addToFavorites, isPending: isAddingToFavorites } =
		useMutation({
			mutationKey: ['add-favorite-report', requestId],
			mutationFn: () => favoriteService.add(requestId),
			onSuccess: async () => {
				toast.success('Отчет добавлен в избранное')

				await queryClient.invalidateQueries({
					queryKey: favoriteReportStatusQueryKey(requestId)
				})
			},
			onError: (error) => {
				console.error('Add favorite report error:', error)

				toast.error('Не удалось добавить в избранное')
			}
		})

	return { addToFavorites, isAddingToFavorites }
}
