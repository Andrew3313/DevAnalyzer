import { Activity, Copy, type LucideIcon, TestTubeDiagonal } from 'lucide-react'

import { cn, formatNumber } from '@/shared/helpers'
import { Progress } from '@/shared/ui/kit'

import { clampPercent } from '../helpers'
import { type IRepositoryQualityMetrics } from '../model'
import { ReportChartCard } from './report-chart-card'

interface IRepositoryHealthCardProps {
	repositories: IRepositoryQualityMetrics[]
	className?: string
}

export const RepositoryHealthCard = ({
	repositories,
	className
}: IRepositoryHealthCardProps) => (
	<ReportChartCard
		icon={Activity}
		title="Покрытие и дубли"
		description="Тестовое покрытие и повторяющийся код по проектам"
		className={className}
	>
		<div className="space-y-5">
			<div className="grid grid-cols-2 gap-3">
				<MetricHint
					icon={TestTubeDiagonal}
					label="Покрытие тестами"
					className="text-violet-500"
				/>
				<MetricHint
					icon={Copy}
					label="Дублирование кода"
					className="text-indigo-500"
				/>
			</div>

			<div className="space-y-5">
				{repositories.map(({ repositoryName, metrics }) => {
					const coverage = clampPercent(metrics?.coverage ?? 0)
					const duplications = clampPercent(
						metrics?.duplications ?? 0
					)

					return (
						<div key={repositoryName} className="space-y-3">
							<div className="flex items-center justify-between gap-3">
								<span className="min-w-0 truncate text-sm font-medium">
									{repositoryName}
								</span>

								<span className="text-muted-foreground shrink-0 text-xs tabular-nums">
									{formatNumber(metrics?.linesOfCode ?? 0)}{' '}
									строк
								</span>
							</div>

							<MetricProgress
								label="Покрытие"
								value={coverage}
								className="*:data-[slot=progress-indicator]:from-violet-500 *:data-[slot=progress-indicator]:to-pink-500"
							/>
							<MetricProgress
								label="Дубли"
								value={duplications}
								className="*:data-[slot=progress-indicator]:from-indigo-500 *:data-[slot=progress-indicator]:to-violet-500"
							/>
						</div>
					)
				})}
			</div>
		</div>
	</ReportChartCard>
)

interface IMetricHintProps {
	icon: LucideIcon
	label: string
	className?: string
}

function MetricHint({ icon: Icon, label, className }: IMetricHintProps) {
	return (
		<div className="bg-secondary/60 dark:bg-card/50 flex items-center gap-2 rounded-xl px-3 py-2">
			<Icon className={cn('size-4', className)} />
			<span className="text-muted-foreground truncate text-xs font-medium">
				{label}
			</span>
		</div>
	)
}

interface IMetricProgressProps {
	label: string
	value: number
	className?: string
}

function MetricProgress({ label, value, className }: IMetricProgressProps) {
	return (
		<div className="grid grid-cols-[5.75rem_1fr_3rem] items-center gap-3">
			<span className="text-muted-foreground truncate text-xs">
				{label}
			</span>

			<Progress
				value={value}
				className={cn(
					'h-2 bg-violet-500/10 *:data-[slot=progress-indicator]:bg-linear-to-r',
					className
				)}
			/>

			<span className="text-muted-foreground text-right text-xs tabular-nums">
				{value}%
			</span>
		</div>
	)
}
