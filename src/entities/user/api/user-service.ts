import { apiClient } from '@/shared/api'

import type { IUser, TUpdateUserInfoApiRequest } from '../model'

class UserService {
	private baseUrl = '/api/users'

	async getSelf(): Promise<IUser> {
		return apiClient.request(`${this.baseUrl}/me`)
	}

	async updateInfo(values: TUpdateUserInfoApiRequest) {
		return apiClient.request(`${this.baseUrl}/me`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(values)
		})
	}

	async changePassword(values: TUpdateUserInfoApiRequest) {
		return apiClient.request(`${this.baseUrl}/me/password`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(values)
		})
	}

	async delete(id: number) {
		return apiClient.request(`${this.baseUrl}/${id}`, {
			method: 'DELETE'
		})
	}
}

export const userService = new UserService()
