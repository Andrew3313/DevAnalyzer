import { type IUser } from '@/entities/user/model'
import { apiClient } from '@/shared/api'

import type { TLoginSchema, TRegisterApiRequest } from '../model'

class AuthService {
	private baseUrl = '/auth'

	async login(values: TLoginSchema) {
		return fetch(`/api/auth/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(values)
		}).then((res) => {
			if (!res.ok) throw new Error(`HTTP error ${res.status}`)
			return res
		})
	}

	async logout() {
		return fetch('/api/auth/logout', { method: 'POST' }).then((res) => {
			if (!res.ok) throw new Error(`HTTP error ${res.status}`)
			return res
		})
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
