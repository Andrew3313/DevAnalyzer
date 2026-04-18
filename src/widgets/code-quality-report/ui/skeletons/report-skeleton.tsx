import { cn } from '@/shared/helpers'

import { QualityIssuesSkeleton } from './quality-issues-skeleton'
import { QualityRatingsSkeleton } from './quality-ratings-skeleton'
import { RepositoryHealthSkeleton } from './repository-health-skeleton'
import { ScanStatsSkeleton } from './scan-stats-skeleton'
import { ScoreCardSkeleton } from './score-card-skeleton'
import { TechStackCoverageSkeleton } from './tech-stack-coverage-skeleton'

interface IReportSkeletonProps {
	className?: string
}

export const ReportSkeleton = ({ className }: IReportSkeletonProps) => (
	<div className={cn('grid gap-4 md:grid-cols-2', className)}>
		<ScoreCardSkeleton />
		<ScanStatsSkeleton />
		<QualityIssuesSkeleton />
		<RepositoryHealthSkeleton />
		<QualityRatingsSkeleton className="md:col-span-2" />
		<TechStackCoverageSkeleton className="md:col-span-2" />
	</div>
)
