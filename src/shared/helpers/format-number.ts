export function formatNumber(num: number, locale: string = 'ru-RU'): string {
	try {
		return new Intl.NumberFormat(locale, {
			notation: 'compact',
			compactDisplay: 'short'
		}).format(num)
	} catch (error) {
		console.error(`Format number error (locale: ${locale}):`, error)

		return num.toString()
	}
}
