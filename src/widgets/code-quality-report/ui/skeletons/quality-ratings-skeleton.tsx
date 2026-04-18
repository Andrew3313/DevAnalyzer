import { Skeleton } from '@/shared/ui/kit'

import { ReportChartCardSkeleton } from './report-chart-card-skeleton'

interface IQualityRatingsSkeletonProps {
	className?: string
}

export const QualityRatingsSkeleton = ({
	className
}: IQualityRatingsSkeletonProps) => (
	<ReportChartCardSkeleton className={className}>
		<div className="space-y-5">
			<div className="grid gap-3 sm:grid-cols-3">
				{Array.from({ length: 3 }).map((_, index) => (
					<Skeleton key={index} className="h-18 rounded-xl" />
				))}
			</div>

			<div className="space-y-4">
				{Array.from({ length: 3 }).map((_, groupIndex) => (
					<div key={groupIndex} className="space-y-2">
						<div className="flex justify-between">
							<Skeleton className="h-5 w-28" />
							<Skeleton className="h-5 w-14" />
						</div>

						<div className="grid grid-cols-5 gap-2">
							{Array.from({ length: 5 }).map((_, index) => (
								<Skeleton
									key={index}
									className="h-21 rounded-lg"
								/>
							))}
						</div>
					</div>
				))}
			</div>

			<div className="flex gap-2">
				{Array.from({ length: 5 }).map((_, index) => (
					<Skeleton key={index} className="h-5 w-8 rounded-full" />
				))}
			</div>
		</div>
	</ReportChartCardSkeleton>
)
