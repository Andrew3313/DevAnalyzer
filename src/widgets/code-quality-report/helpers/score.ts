import { SCORE_META, ScoreColor, type TScoreMeta } from '../values'

export function normalizeScore(value: unknown): number {
	if (typeof value !== 'number' || Number.isNaN(value)) return 0

	if (value < 0) return 0
	if (value > 100) return 100

	return Math.round(value)
}

export function getScoreMeta(rawScore: unknown): TScoreMeta {
	const score = normalizeScore(rawScore)

	const item = SCORE_META.find((i) => score >= i.min)

	if (!item)
		return {
			color: ScoreColor.DANGER,
			description: 'Нет данных'
		}

	return {
		color: item.color,
		description: item.description
	}
}
