import { type IUser } from '@/entities/user/model'
import { apiClient } from '@/shared/api'

import type { TLoginSchema, TRegisterApiRequest } from '../model'

class AuthService {
	async login(values: TLoginSchema) {
		return apiClient.request('/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(values)
		})
	}

	async logout() {
		return apiClient.request('/auth/logout', { method: 'POST' })
	}

	async refresh(cookie?: string) {
		return apiClient.request('/auth/refresh', {
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
