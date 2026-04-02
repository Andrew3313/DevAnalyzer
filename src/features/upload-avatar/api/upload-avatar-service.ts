import { apiClient } from '@/shared/api'
import { unquote } from '@/shared/helpers'

class UploadAvatarService {
	async uploadAvatar(file: File) {
		const uploadUrl = await this.requestUploadUrl()
		await this.uploadToS3(unquote(uploadUrl), file)
	}

	async requestUploadUrl(): Promise<string> {
		return apiClient.request('/api/users/avatars', {
			method: 'POST'
		})
	}

	async uploadToS3(uploadUrl: string, file: File) {
		return fetch(uploadUrl, {
			method: 'PUT',
			headers: { 'Content-Type': file.type },
			body: file
		})
	}
}

export const uploadAvatarService = new UploadAvatarService()
