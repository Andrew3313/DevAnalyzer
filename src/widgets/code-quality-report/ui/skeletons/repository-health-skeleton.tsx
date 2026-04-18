import { Skeleton } from '@/shared/ui/kit'

import { ReportChartCardSkeleton } from './report-chart-card-skeleton'

interface IRepositoryHealthSkeletonProps {
	className?: string
}

export const RepositoryHealthSkeleton = ({
	className
}: IRepositoryHealthSkeletonProps) => (
	<ReportChartCardSkeleton className={className}>
		<div className="space-y-5">
			<div className="grid grid-cols-2 gap-3">
				<Skeleton className="h-9 rounded-xl" />
				<Skeleton className="h-9 rounded-xl" />
			</div>

			<div className="space-y-5">
				{Array.from({ length: 4 }).map((_, index) => (
					<div key={index} className="space-y-3">
						<div className="flex justify-between gap-3">
							<Skeleton className="h-5 w-32" />
							<Skeleton className="h-5 w-16" />
						</div>
						<Skeleton className="h-2 w-full rounded-full" />
						<Skeleton className="h-2 w-full rounded-full" />
					</div>
				))}
			</div>
		</div>
	</ReportChartCardSkeleton>
)
