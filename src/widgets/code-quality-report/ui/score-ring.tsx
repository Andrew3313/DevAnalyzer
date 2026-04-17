import { cn } from '@/shared/helpers'

interface IScoreRingProps {
	value: number
	max?: number
	size?: number
	strokeWidth?: number
	textClassName?: string
	strokeClassName?: string
	className?: string
}

export function ScoreRing({
	value,
	max = 100,
	size = 180,
	strokeWidth = 12,
	textClassName,
	strokeClassName,
	className
}: IScoreRingProps) {
	const safeValue = Math.max(0, Math.min(value, max))

	const radius = (size - strokeWidth) / 2
	const circumference = 2 * Math.PI * radius
	const progress = safeValue / max
	const offset = circumference - progress * circumference

	return (
		<div
			className={cn(
				'relative inline-flex items-center justify-center',
				className
			)}
			role="img"
			aria-label={`Score ${safeValue} of ${max}`}
		>
			<svg width={size} height={size} className="-rotate-90">
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					fill="none"
					strokeWidth={strokeWidth}
					className="stroke-muted"
				/>

				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					fill="none"
					strokeWidth={strokeWidth}
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					strokeLinecap="round"
					className={cn(
						'transition-all duration-700 ease-out',
						strokeClassName
					)}
				/>
			</svg>

			<div className="absolute flex flex-col items-center">
				<span
					className={cn(
						'text-4xl font-bold tabular-nums',
						textClassName
					)}
				>
					{safeValue}
				</span>
				<span className="text-muted-foreground text-sm">из {max}</span>
			</div>
		</div>
	)
}
