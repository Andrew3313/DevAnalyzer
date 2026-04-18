import { Bug, ShieldAlert, Sparkles } from 'lucide-react'

import { cn, formatNumber } from '@/shared/helpers'
import { Badge } from '@/shared/ui/kit'

import { getMaxIssueTotal, getRepositoryIssueTotal } from '../helpers'
import { type IRepositoryQualityMetrics } from '../model'
import { ReportChartCard } from './report-chart-card'

const ISSUE_SEGMENTS = [
	{
		key: 'bugs',
		label: 'Баги',
		className: 'bg-rose-500'
	},
	{
		key: 'vulnerabilities',
		label: 'Уязвимости',
		className: 'bg-violet-500'
	},
	{
		key: 'codeSmells',
		label: 'Слабые места',
		className: 'bg-indigo-500'
	}
] as const

interface IQualityIssuesCardProps {
	repositories: IRepositoryQualityMetrics[]
	className?: string
}

export function QualityIssuesCard({
	repositories,
	className
}: IQualityIssuesCardProps) {
	const maxIssueTotal = getMaxIssueTotal(repositories)

	return (
		<ReportChartCard
			icon={Bug}
			title="Проблемы"
			description="Баги, уязвимости и слабые места"
			className={className}
			action={
				<Badge className="shrink-0 rounded-full bg-violet-500/10 text-violet-500">
					{repositories.length} реп.
				</Badge>
			}
		>
			<div className="space-y-5">
				<div className="flex flex-wrap gap-3 text-xs">
					{ISSUE_SEGMENTS.map(({ key, label, className }) => (
						<div key={key} className="flex items-center gap-2">
							<span
								className={cn(
									'size-2.5 rounded-full',
									className
								)}
							/>
							<span className="text-muted-foreground">
								{label}
							</span>
						</div>
					))}
				</div>

				<div className="space-y-4">
					{repositories.map((repository) => {
						const total = getRepositoryIssueTotal(repository)
						const metrics = repository.metrics
						const width = `${(total / maxIssueTotal) * 100}%`

						return (
							<div
								key={repository.repositoryName}
								className="space-y-2"
							>
								<div className="flex items-center justify-between gap-3">
									<span className="min-w-0 truncate text-sm font-medium">
										{repository.repositoryName}
									</span>

									<span className="text-muted-foreground shrink-0 text-xs tabular-nums">
										{formatNumber(total)}
									</span>
								</div>

								<div className="bg-muted/70 h-3 overflow-hidden rounded-full">
									<div
										className="flex h-full overflow-hidden rounded-full"
										style={{ width }}
									>
										{metrics &&
											ISSUE_SEGMENTS.map(
												({ key, className, label }) => {
													const value = metrics[key]
													const segmentWidth = total
														? `${(value / total) * 100}%`
														: '0%'

													return (
														<div
															key={key}
															aria-label={`${label}: ${value}`}
															className={
																className
															}
															style={{
																width: segmentWidth
															}}
														/>
													)
												}
											)}
									</div>
								</div>

								{metrics && (
									<div className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 text-xs">
										<span className="inline-flex items-center gap-1">
											<Sparkles className="size-3 text-indigo-500" />
											{metrics.codeSmells}
										</span>

										<span className="inline-flex items-center gap-1">
											<Bug className="size-3 text-rose-500" />
											{metrics.bugs}
										</span>

										<span className="inline-flex items-center gap-1">
											<ShieldAlert className="size-3 text-violet-500" />
											{metrics.vulnerabilities}
										</span>
									</div>
								)}
							</div>
						)
					})}
				</div>
			</div>
		</ReportChartCard>
	)
}
