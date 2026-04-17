import { cn } from '@/shared/helpers'

import { type ICodeQualityReport } from '../model'
import { ScanStatsCard } from './scan-stats-card'
import { ScoreCard } from './score-card'
import { ReportSkeleton } from './skeletons'

interface IQualityAnalysisProps {
	report?: ICodeQualityReport
	isLoading?: boolean
	className?: string
}

export function QualityAnalysis({
	report,
	isLoading,
	className
}: IQualityAnalysisProps) {
	const hasAnalysis = !isLoading && report

	return (
		<section className={cn('space-y-4', className)}>
			<h2 className="from-primary to-primary/60 mb-4 bg-linear-to-r bg-clip-text text-start text-xl font-bold tracking-tight text-transparent">
				🛠️ Детальный анализ
			</h2>

			{isLoading && <ReportSkeleton />}

			{hasAnalysis && (
				<div className="grid gap-4 md:grid-cols-2">
					<ScoreCard score={report.overallScore} />
					<ScanStatsCard
						totalRepositories={report.totalRepositories}
						filteredRepositories={report.filteredRepositories}
						verifiedRepositories={report.verifiedRepositories}
						successfulScans={report.successfulScans}
						failedScans={report.failedScans}
					/>
				</div>
			)}
		</section>
	)
}
