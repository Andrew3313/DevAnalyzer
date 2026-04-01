import { apiClient } from '@/shared/api'

class RecoverPasswordService {
	private baseUrl = '/auth'

	async forgotPassword(email: string) {
		return apiClient.request(`${this.baseUrl}/forgot-password`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email })
		})
	}

	async resetPassword(token: string, newPassword: string) {
		return apiClient.request(`${this.baseUrl}/reset-password`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token, newPassword })
		})
	}
}

export const recoverPasswordService = new RecoverPasswordService()
