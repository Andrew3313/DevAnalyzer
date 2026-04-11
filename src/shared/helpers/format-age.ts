import { pluralRu } from '@/shared/helpers'

export function formatAge(days: number): string {
	const years = Math.floor(days / 365)
	if (years >= 1) {
		return `${years} ${pluralRu(years, 'год', 'года', 'лет')}`
	}

	const months = Math.floor(days / 30)
	if (months >= 1) {
		return `${months} ${pluralRu(months, 'месяц', 'месяца', 'месяцев')}`
	}

	return `${days} ${pluralRu(days, 'день', 'дня', 'дней')}`
}
