import { apiClient } from '@/shared/api'

class FavoriteService {
	private baseUrl = '/api/favorites'

	async add(requestId: string): Promise<void> {
		return apiClient.request<void>(`${this.baseUrl}/${requestId}`, {
			method: 'POST'
		})
	}

	async remove(requestId: string): Promise<void> {
		return apiClient.request<void>(`${this.baseUrl}/${requestId}`, {
			method: 'DELETE'
		})
	}

	async check(requestId: string): Promise<boolean> {
		return apiClient.request(`${this.baseUrl}/check/${requestId}`)
	}
}

export const favoriteService = new FavoriteService()
