import { Layers3 } from 'lucide-react'

import { cn } from '@/shared/helpers'
import { Badge } from '@/shared/ui/kit'

import { clampPercent, getTechStackFrequency } from '../helpers'
import {
	type IRepositoryQualityMetrics,
	type ITechStackAnalysis
} from '../model'
import { ReportChartCard } from './report-chart-card'

interface ITechStackCoverageCardProps {
	analysis: ITechStackAnalysis
	repositories: IRepositoryQualityMetrics[]
	className?: string
}

export function TechStackCoverageCard({
	analysis,
	repositories,
	className
}: ITechStackCoverageCardProps) {
	const percentageFound = clampPercent(analysis.percentageFound)
	const frequency = getTechStackFrequency(repositories).slice(0, 8)
	const maxFrequency = Math.max(...frequency.map(({ count }) => count), 1)

	return (
		<ReportChartCard
			icon={Layers3}
			title="Стек технологий"
			description="Совпадение требований с найденными технологиями"
			action={
				<Badge className="shrink-0 rounded-full bg-violet-400 text-white">
					{percentageFound}%
				</Badge>
			}
			className={className}
		>
			<div className="grid gap-4 lg:grid-cols-2">
				<TechStackList
					title="Требуемые технологии"
					items={analysis.requestedFilters}
					foundItems={analysis.foundTechStack}
					missingItems={analysis.notFoundTechStack}
				/>

				<div className="flex flex-col gap-2">
					<span className="text-sm font-medium">
						Частота в репозиториях
					</span>

					<div className="space-y-2">
						{frequency.map(({ name, count }) => (
							<div
								key={name}
								className="grid grid-cols-[minmax(0,1fr)_4rem] items-center gap-3"
							>
								<div className="min-w-0">
									<div className="mb-1 flex items-center justify-between gap-2 text-xs">
										<span className="truncate">{name}</span>
									</div>

									<div className="bg-muted/70 h-2 overflow-hidden rounded-full">
										<div
											className="h-full rounded-full bg-linear-to-r from-violet-500 to-indigo-500"
											style={{
												width: `${(count / maxFrequency) * 100}%`
											}}
										/>
									</div>
								</div>

								<span className="text-muted-foreground text-right text-xs tabular-nums">
									{count} реп.
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</ReportChartCard>
	)
}

interface ITechStackListProps {
	title: string
	items: string[]
	foundItems: string[]
	missingItems: string[]
}

function TechStackList({
	title,
	items,
	foundItems,
	missingItems
}: ITechStackListProps) {
	const foundSet = new Set(foundItems)
	const missingSet = new Set(missingItems)

	return (
		<div className="flex flex-col gap-2">
			<span className="text-sm font-medium">{title}</span>

			<div className="flex flex-wrap gap-2">
				{items.map((item) => {
					const isFound = foundSet.has(item)
					const isMissing = missingSet.has(item)

					return (
						<Badge
							key={item}
							variant="outline"
							className={cn(
								'rounded-full',
								isFound &&
									'border-violet-500/40 bg-violet-500/10 text-violet-500',
								isMissing &&
									'border-rose-500/40 bg-rose-500/10 text-rose-500'
							)}
						>
							{item}
						</Badge>
					)
				})}
			</div>
		</div>
	)
}
