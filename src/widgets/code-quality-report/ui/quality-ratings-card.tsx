import { ShieldCheck } from 'lucide-react'

import { cn } from '@/shared/helpers'
import { Badge } from '@/shared/ui/kit'

import { getRatingCounts, RATING_ORDER } from '../helpers'
import {
	type IQualityReportSummary,
	type IRepositoryQualityMetrics,
	type TRating
} from '../model'
import { ReportChartCard } from './report-chart-card'

const RATING_STYLES: Readonly<Record<TRating, string>> = {
	A: 'bg-emerald-500',
	B: 'bg-violet-500',
	C: 'bg-amber-500',
	D: 'bg-orange-500',
	E: 'bg-rose-500'
}

const RATING_GROUPS = [
	{
		label: 'Безопасность',
		medianKey: 'medianSecurityRating',
		getRating: ({ metrics }: IRepositoryQualityMetrics) =>
			metrics?.securityRating ?? null
	},
	{
		label: 'Надежность',
		medianKey: 'medianReliabilityRating',
		getRating: ({ metrics }: IRepositoryQualityMetrics) =>
			metrics?.reliabilityRating ?? null
	},
	{
		label: 'Поддерживаемость',
		medianKey: 'medianMaintainabilityRating',
		getRating: ({ metrics }: IRepositoryQualityMetrics) =>
			metrics?.maintainabilityRating ?? null
	}
] as const

interface IQualityRatingsCardProps {
	repositories: IRepositoryQualityMetrics[]
	summary: IQualityReportSummary
	className?: string
}

export const QualityRatingsCard = ({
	repositories,
	summary,
	className
}: IQualityRatingsCardProps) => (
	<ReportChartCard
		icon={ShieldCheck}
		title="Рейтинги качества"
		description="По шкале SonarQube"
		className={className}
	>
		<div className="space-y-5">
			<div className="grid gap-3 sm:grid-cols-3">
				{RATING_GROUPS.map(({ label, medianKey }) => {
					const median = summary[medianKey]

					return (
						<div
							key={label}
							className="bg-secondary/60 dark:bg-card/50 rounded-xl p-3"
						>
							<span className="text-muted-foreground block truncate text-xs">
								{label}
							</span>

							<div className="mt-2 flex items-center gap-2">
								<Badge
									className={cn(
										'rounded-full text-white',
										median
											? RATING_STYLES[median]
											: 'bg-muted text-muted-foreground'
									)}
								>
									{median ?? 'N/A'}
								</Badge>
								<span className="text-xs font-medium">
									медиана
								</span>
							</div>
						</div>
					)
				})}
			</div>

			<div className="space-y-4">
				{RATING_GROUPS.map(({ label, getRating }) => {
					const counts = getRatingCounts(repositories, getRating)
					const maxCount = Math.max(
						...counts.map(({ count }) => count),
						1
					)

					return (
						<div key={label} className="space-y-2">
							<div className="flex items-center justify-between gap-3">
								<span className="text-sm font-medium">
									{label}
								</span>
								<span className="text-muted-foreground text-xs">
									{repositories.length} реп.
								</span>
							</div>

							<div className="grid grid-cols-5 gap-2">
								{counts.map(({ rating, count }) => (
									<div
										key={rating}
										className="flex flex-col gap-1.5"
									>
										<div className="bg-muted/70 flex h-16 items-end overflow-hidden rounded-lg">
											<div
												className={cn(
													'w-full rounded-t-lg',
													RATING_STYLES[rating]
												)}
												style={{
													height: `${(count / maxCount) * 100}%`
												}}
											/>
										</div>
										<div className="flex items-center justify-between text-xs">
											<span className="font-medium">
												{rating}
											</span>
											<span className="text-muted-foreground tabular-nums">
												{count}
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
					)
				})}
			</div>

			<div className="flex flex-wrap gap-2">
				{RATING_ORDER.map((rating) => (
					<Badge
						key={rating}
						className={cn(
							'rounded-full text-white',
							RATING_STYLES[rating]
						)}
					>
						{rating}
					</Badge>
				))}
			</div>
		</div>
	</ReportChartCard>
)
