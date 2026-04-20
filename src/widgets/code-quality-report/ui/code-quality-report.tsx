'use client'

import { useFavoriteReportToggle } from '@/features/add-favorite-report/hooks'
import { AddFavoriteReportButton } from '@/features/add-favorite-report/ui'
import { GithubStatsControlled } from '@/features/view-github-stats/ui'
import { TopRepositoriesControlled } from '@/features/view-top-repositories/ui'
import { cn } from '@/shared/helpers'
import { StateMessage } from '@/shared/ui'
import { Skeleton } from '@/shared/ui/kit'

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

	const { state, actions } = useFavoriteReportToggle({
		requestId: reportId,
		enabled: !!report,
		isReportLoading: isLoadingReport
	})

	const topRepositories = report?.gitHubRepo?.slice(0, 4)

	return (
		<div className={cn('flex min-h-[65vh] flex-col', className)}>
			{!reportError ? (
				<div className="space-y-8">
					<div className="space-y-3">
						<div className="flex justify-end">
							{state.isLoadingFavoriteButton ? (
								<Skeleton className="h-10 w-full rounded-xl sm:w-54" />
							) : (
								<AddFavoriteReportButton
									withLabel
									isFavorite={state.isFavorite}
									isLoading={state.isUpdatingFavorite}
									disabled={state.isFavoriteButtonDisabled}
									onToggleFavorite={actions.toggleFavorite}
								/>
							)}
						</div>

						<GithubStatsControlled
							stats={report?.gitHubStats}
							isLoading={isLoadingReport}
						/>
					</div>

					<TopRepositoriesControlled
						repositories={topRepositories}
						isLoading={isLoadingReport}
					/>

					<QualityAnalysis
						report={report}
						isLoading={isLoadingReport}
					/>
				</div>
			) : (
				<StateMessage
					title="Что-то пошло не так..."
					description="Попробуйте обновить страницу"
					descriptionClassName="text-sm"
					className="flex-1"
				/>
			)}
		</div>
	)
}
