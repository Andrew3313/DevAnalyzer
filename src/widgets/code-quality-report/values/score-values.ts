export enum ScoreColor {
	SUCCESS = 'success',
	WARNING = 'warning',
	DANGER = 'danger',
	NEUTRAL = 'neutral'
}

export const SCORE_COLOR_CLASSES: Readonly<
	Record<ScoreColor, { text: string; stroke: string }>
> = {
	[ScoreColor.SUCCESS]: {
		text: 'text-emerald-500',
		stroke: 'stroke-emerald-500'
	},
	[ScoreColor.WARNING]: {
		text: 'text-amber-500',
		stroke: 'stroke-amber-500'
	},
	[ScoreColor.DANGER]: {
		text: 'text-red-500',
		stroke: 'stroke-red-500'
	},
	[ScoreColor.NEUTRAL]: {
		text: 'text-muted-foreground',
		stroke: 'stroke-muted'
	}
}

export type TScoreMeta = {
	color: ScoreColor
	description: string
}
export type ScoreMetaItem = TScoreMeta & {
	min: number
}
export const SCORE_META: ReadonlyArray<ScoreMetaItem> = [
	{
		min: 80,
		color: ScoreColor.SUCCESS,
		description: 'Отличное качество кода'
	},
	{
		min: 60,
		color: ScoreColor.SUCCESS,
		description: 'Хорошее качество кода'
	},
	{ min: 40, color: ScoreColor.WARNING, description: 'Код требует внимания' },
	{ min: 0, color: ScoreColor.DANGER, description: 'Код требует доработки' }
]
