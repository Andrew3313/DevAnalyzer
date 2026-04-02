import { apiClient } from '@/shared/api'

import type { IUser, TUpdateUserInfoApiRequest } from '../model'

class UserService {
	private baseUrl = '/api/users'

	async getAvatarUrl(extraHeaders?: HeadersInit): Promise<string> {
		return apiClient.request(`${this.baseUrl}/avatars`, {
			method: 'GET',
			headers: extraHeaders
		})
	}

	async getSelf(extraHeaders?: HeadersInit): Promise<IUser> {
		return apiClient.request(`${this.baseUrl}/me`, {
			headers: extraHeaders
		})
	}

	async updateInfo(values: TUpdateUserInfoApiRequest) {
		return apiClient.request(`${this.baseUrl}/me`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(values)
		})
	}

	async changePassword(newPassword: string) {
		return apiClient.request(`${this.baseUrl}/me/password`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ password: newPassword })
		})
	}

	async delete(id: number) {
		return apiClient.request(`${this.baseUrl}/${id}`, {
			method: 'DELETE'
		})
	}
}

export const userService = new UserService()
