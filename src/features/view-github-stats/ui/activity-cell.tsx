import { cn, pluralRu } from '@/shared/helpers'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/kit'

import { formatDate } from '../helpers'
import { ACTIVITY_LEVEL_STYLE, ContributionLevel } from '../values'

interface IActivityCellProps {
	count: number
	level: ContributionLevel
	weekStart: string
	dayIndex: number
}

export function ActivityCell({
	count,
	level,
	weekStart,
	dayIndex
}: IActivityCellProps) {
	const countContributionText = `${count} ${pluralRu(count, 'контрибуция', 'контрибуции', 'контрибуций')}`
	const formattedDate = formatDate(weekStart, dayIndex)

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<div
					className={cn(
						'size-4 cursor-default rounded-sm',
						ACTIVITY_LEVEL_STYLE[level]
					)}
				/>
			</TooltipTrigger>
			<TooltipContent side="top" className="flex flex-col gap-0.5">
				<span className="font-semibold">{countContributionText}</span>
				<span className="text-muted text-xs">{formattedDate}</span>
			</TooltipContent>
		</Tooltip>
	)
}
