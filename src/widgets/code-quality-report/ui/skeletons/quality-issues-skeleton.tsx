import { Skeleton } from '@/shared/ui/kit'

import { ReportChartCardSkeleton } from './report-chart-card-skeleton'

interface IQualityIssuesSkeletonProps {
	className?: string
}

export const QualityIssuesSkeleton = ({
	className
}: IQualityIssuesSkeletonProps) => (
	<ReportChartCardSkeleton className={className}>
		<div className="space-y-5">
			<div className="flex gap-3">
				{Array.from({ length: 3 }).map((_, index) => (
					<Skeleton key={index} className="h-4 w-24" />
				))}
			</div>

			<div className="space-y-4">
				{Array.from({ length: 4 }).map((_, index) => (
					<div key={index} className="space-y-2">
						<div className="flex justify-between gap-3">
							<Skeleton className="h-5 w-32" />
							<Skeleton className="h-5 w-10" />
						</div>
						<Skeleton className="h-3 w-full rounded-full" />
						<Skeleton className="h-4 w-40" />
					</div>
				))}
			</div>
		</div>
	</ReportChartCardSkeleton>
)
