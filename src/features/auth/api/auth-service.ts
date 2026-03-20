import { type IUser } from '@/entities/user/model'
import { apiClient } from '@/shared/api'

import type { TLoginSchema, TRegisterSchema } from '../model'

type TRegisterApiRequest = Required<
	Omit<TRegisterSchema, 'role' | 'confirmPassword'>
>

const toRegisterApiRequest = (data: TRegisterSchema): TRegisterApiRequest => ({
	email: data.email,
	password: data.password,
	firstName: data.firstName,
	lastName: data.lastName,
	patronymic: data.patronymic,
	company: data.company ?? '',
	position: data.position ?? ''
})

class AuthService {
	async register(values: TRegisterSchema): Promise<IUser> {
		const body = toRegisterApiRequest(values)
		return apiClient.request('/users/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})
	}

	async login(values: TLoginSchema) {
		return apiClient.request('/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(values)
		})
	}

	async logout() {
		return apiClient.request('/auth/logout', {
			method: 'POST'
		})
	}

	async refresh(cookie: string): Promise<Response> {
		return apiClient.request('/auth/refresh', {
			method: 'POST',
			headers: cookie ? { Cookie: cookie } : undefined,
			rawResponse: true
		})
	}
}

export const authService = new AuthService()
