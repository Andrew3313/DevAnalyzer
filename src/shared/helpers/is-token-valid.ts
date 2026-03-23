import { decodeJwt } from 'jose'

export function isTokenValid(token: string, clockSkewSeconds = 30): boolean {
	try {
		const payload = decodeJwt(token) as { exp?: number }

		if (!payload.exp) return false

		return payload.exp * 1000 > Date.now() - clockSkewSeconds * 1000
	} catch {
		return false
	}
}
