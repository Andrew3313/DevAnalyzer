import { type IUser } from '@/entities/user/model'
import { apiClient } from '@/shared/api'

import type { TLoginSchema, TRegisterApiRequest } from '../model'

class AuthService {
	private baseUrl = '/auth'

	async login(values: TLoginSchema) {
		return apiClient.request(`${this.baseUrl}/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(values)
		})
	}

	async logout() {
		return apiClient.request(`${this.baseUrl}/logout`, { method: 'POST' })
	}

	async refresh(cookie?: string) {
		return apiClient.request(`${this.baseUrl}/refresh`, {
			method: 'POST',
			headers: cookie ? { Cookie: cookie } : undefined,
			rawResponse: true
		})
	}

	async register(values: TRegisterApiRequest): Promise<IUser> {
		return apiClient.request('/api/users/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(values)
		})
	}
}

export const authService = new AuthService()
