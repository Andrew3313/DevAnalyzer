import { addDays, format } from 'date-fns'
import { ru } from 'date-fns/locale'

export function formatDate(weekStart: string, dayIndex: number) {
	const startDate = new Date(weekStart)
	const targetDate = addDays(startDate, dayIndex)

	return format(targetDate, 'd MMMM yyyy', { locale: ru })
}
