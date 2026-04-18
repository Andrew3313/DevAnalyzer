import { Skeleton } from '@/shared/ui/kit'

import { ReportChartCardSkeleton } from './report-chart-card-skeleton'

interface ITechStackCoverageSkeletonProps {
	className?: string
}

export const TechStackCoverageSkeleton = ({
	className
}: ITechStackCoverageSkeletonProps) => (
	<ReportChartCardSkeleton className={className}>
		<div className="space-y-5">
			<div className="space-y-2">
				<div className="flex justify-between gap-4">
					<Skeleton className="h-5 w-20" />
					<Skeleton className="h-5 w-12" />
				</div>
				<Skeleton className="h-2 w-full rounded-full" />
			</div>

			<div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
				<div className="space-y-3">
					<Skeleton className="h-5 w-40" />

					<div className="flex flex-wrap gap-2">
						{Array.from({ length: 8 }).map((_, index) => (
							<Skeleton
								key={index}
								className="h-5 w-20 rounded-full"
							/>
						))}
					</div>
				</div>

				<div className="space-y-3">
					<Skeleton className="h-5 w-36" />

					{Array.from({ length: 5 }).map((_, index) => (
						<div
							key={index}
							className="grid grid-cols-[minmax(0,1fr)_4rem] items-center gap-3"
						>
							<div className="space-y-1">
								<Skeleton className="h-4 w-24" />
								<Skeleton className="h-2 w-full rounded-full" />
							</div>
							<Skeleton className="h-4 w-12 justify-self-end" />
						</div>
					))}
				</div>
			</div>
		</div>
	</ReportChartCardSkeleton>
)
