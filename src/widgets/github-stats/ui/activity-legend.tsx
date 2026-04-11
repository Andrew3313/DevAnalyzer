import { cn } from '@/shared/helpers'

import { ACTIVITY_LEVEL_STYLE } from '../values'

export const ActivityLegend = () => (
	<div className="text-muted-foreground flex flex-col items-center gap-1.5 text-xs sm:flex-row sm:justify-between">
		<span>Уровень активности</span>

		<div className="flex items-center gap-1.5">
			<span className="hidden md:inline">Меньше</span>

			{Object.values(ACTIVITY_LEVEL_STYLE).map((style, index) => (
				<div key={index} className={cn('size-4 rounded-sm', style)} />
			))}

			<span className="hidden md:inline">Больше</span>
		</div>
	</div>
)
