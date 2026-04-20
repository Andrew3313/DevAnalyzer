import { apiClient } from '@/shared/api'

import type { IFavoriteReport, IFavoriteReportsParams } from '../model'

export const fetchFavoriteReports = ({
	limit,
	offset
}: IFavoriteReportsParams): Promise<IFavoriteReport[]> =>
	apiClient.request('/api/favorites', {
		queryParams: {
			limit,
			offset
		}
	})
