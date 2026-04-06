/**
 * GitHub username rules:
 * - 1-39 chars
 * - letters, numbers, hyphen
 * - cannot start or end with hyphen
 * - no consecutive hyphens
 */
const GITHUB_USERNAME_REGEX = /^(?!-)(?!.*--)[a-zA-Z0-9-]{1,39}(?<!-)$/

export const isValidGitHubUsername = (username: string): boolean =>
	GITHUB_USERNAME_REGEX.test(username)

export function extractGitHubUsername(input: string): string | null {
	const trimmed = input.trim()
	if (!trimmed) return null

	if (trimmed.startsWith('@')) {
		const username = trimmed.slice(1)
		return isValidGitHubUsername(username) ? username : null
	}

	try {
		const normalized = trimmed.startsWith('http')
			? trimmed
			: `https://${trimmed}`

		const url = new URL(normalized)
		if (!url.hostname.includes('github.com')) return null

		const username = url.pathname.split('/')[1]
		return isValidGitHubUsername(username) ? username : null
	} catch {
		return null
	}
}
