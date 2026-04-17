'use client'

import { GithubStatsControlled } from '@/features/view-github-stats/ui'
import { TopRepositoriesControlled } from '@/features/view-top-repositories/ui'
import { cn } from '@/shared/helpers'
import { StateMessage } from '@/shared/ui'

import { useQualityReport } from '../hooks'
import { QualityAnalysis } from './quality-analysis'

interface ICodeQualityReportProps {
	reportId: string
	className?: string
}

export function CodeQualityReport({
	reportId,
	className
}: ICodeQualityReportProps) {
	const { report, isLoadingReport, reportError } = useQualityReport(reportId)

	const topRepositories = report?.gitHubRepo?.slice(0, 4)

	return (
		<div className={cn('flex min-h-[65vh] flex-col', className)}>
			{reportError && (
				<StateMessage
					title="Что-то пошло не так..."
					description="Попробуйте обновить страницу"
					descriptionClassName="text-sm"
					className="flex-1"
				/>
			)}

			<div className="space-y-4">
				<GithubStatsControlled
					stats={report?.gitHubStats}
					isLoading={isLoadingReport}
					withSkeletonHeatmap={false}
				/>

				<TopRepositoriesControlled
					repositories={topRepositories}
					isLoading={isLoadingReport}
				/>

				<QualityAnalysis report={report} />
			</div>
		</div>
	)
}
