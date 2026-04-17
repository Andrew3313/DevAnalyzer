import { cn } from '@/shared/helpers'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/shared/ui/kit'

import { getScoreMeta, normalizeScore } from '../helpers'
import { SCORE_COLOR_CLASSES } from '../values'
import { ScoreRing } from './score-ring'

interface IScoreCardProps {
	score: unknown
	message?: string
	className?: string
}

export function ScoreCard({ score, message, className }: IScoreCardProps) {
	const normalizedScore = normalizeScore(score)
	const meta = getScoreMeta(normalizedScore)

	const colors = SCORE_COLOR_CLASSES[meta.color]
	const displayMessage = message ?? meta.description

	return (
		<Card
			className={cn(
				'border-border/50 bg-card/50 shadow-primary/5 overflow-hidden shadow-lg',
				className
			)}
		>
			<CardHeader>
				<CardTitle>Общий рейтинг</CardTitle>
				<CardDescription>
					Комплексная оценка качества кода
				</CardDescription>
			</CardHeader>

			<CardContent className="flex flex-col items-center justify-center">
				<ScoreRing
					value={normalizedScore}
					textClassName={colors.text}
					strokeClassName={colors.stroke}
					className="mb-4"
				/>

				<p className="text-muted-foreground max-w-xs text-center text-sm">
					{displayMessage}
				</p>
			</CardContent>
		</Card>
	)
}
