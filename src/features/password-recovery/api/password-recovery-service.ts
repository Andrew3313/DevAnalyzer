import { apiClient } from '@/shared/api'

class PasswordRecoveryService {
	async forgotPassword(email: string) {
		return apiClient.request('/auth/forgot-password', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email })
		})
	}

	async resetPassword(token: string, newPassword: string) {
		return apiClient.request('/auth/reset-password', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token, newPassword })
		})
	}
}

export const passwordRecoveryService = new PasswordRecoveryService()
