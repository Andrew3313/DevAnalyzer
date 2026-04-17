import { cn } from '@/shared/helpers'

import { ScanStatsSkeleton } from './scan-stats-skeleton'
import { ScoreCardSkeleton } from './score-card-skeleton'

interface IReportSkeletonProps {
	className?: string
}

export const ReportSkeleton = ({ className }: IReportSkeletonProps) => (
	<div className={cn('grid gap-4 md:grid-cols-2', className)}>
		<ScoreCardSkeleton />
		<ScanStatsSkeleton />
	</div>
)
