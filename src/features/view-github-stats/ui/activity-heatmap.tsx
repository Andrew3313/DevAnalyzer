'use client'

import { useMemo } from 'react'

import { type IHeatmapWeekList } from '@/entities/candidate-stats/model'
import { cn, pluralRu } from '@/shared/helpers'
import { Badge } from '@/shared/ui/kit'
import { DAYS_OF_WEEK } from '@/shared/values'

import { computeHeatmapStats, getContributionLevel } from '../helpers'
import { ActivityCell } from './activity-cell'
import { ActivityLegend } from './activity-legend'

interface IActivityHeatmapProps {
	heatmap: IHeatmapWeekList
	className?: string
}

export function ActivityHeatmap({ heatmap, className }: IActivityHeatmapProps) {
	const { totalContributions, maxContributions } = useMemo(
		() => computeHeatmapStats(heatmap),
		[heatmap]
	)

	const totalActivityForYear = `${totalContributions} ${pluralRu(
		totalContributions,
		'контрибуция',
		'контрибуции',
		'контрибуций'
	)}`

	return (
		<div
			className={cn(
				'bg-secondary/60 dark:bg-card/50 flex flex-col gap-4 overflow-hidden rounded-xl p-4',
				className
			)}
		>
			<div className="flex items-center justify-between gap-6">
				<div className="flex flex-col gap-0.5">
					<span className="text-foreground text-sm font-semibold">
						Активность за год
					</span>
					<span className="text-muted-foreground text-xs">
						{totalActivityForYear}
					</span>
				</div>

				<Badge className="rounded-full">
					Максимум: {maxContributions}
				</Badge>
			</div>

			<div className="scrollbar-hide overflow-x-auto">
				<div className="flex gap-1">
					<div className="flex flex-col gap-1 pr-2">
						{DAYS_OF_WEEK.map((day, index) => (
							<div
								key={day}
								className={cn(
									'text-muted-foreground h-4 text-center text-xs',
									{
										invisible: !(index % 2)
									}
								)}
							>
								{day}
							</div>
						))}
					</div>

					<div className="flex gap-1">
						{heatmap.map(({ weekStart, days }) => (
							<div
								key={weekStart}
								className="flex flex-col gap-1"
							>
								{days.map((count, dayIndex) => (
									<ActivityCell
										key={`${weekStart}-${dayIndex}`}
										level={getContributionLevel(count)}
										count={count}
										weekStart={weekStart}
										dayIndex={dayIndex}
									/>
								))}
							</div>
						))}
					</div>
				</div>
			</div>

			<ActivityLegend />
		</div>
	)
}
