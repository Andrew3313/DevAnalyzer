'use client'

import { ViewGithubStats } from '@/features/view-github-stats/ui'
import { ViewTopRepositories } from '@/features/view-top-repositories/ui'
import { cn } from '@/shared/helpers'
import { StateMessage } from '@/shared/ui'
import { Spinner } from '@/shared/ui/kit'

import { useQualityReport } from '../hooks'

interface ICodeQualityReportProps {
	reportId: string
	className?: string
}

export function CodeQualityReport({
	reportId,
	className
}: ICodeQualityReportProps) {
	const { report, isLoadingReport, reportError } = useQualityReport(reportId)

	const hasReport = !isLoadingReport && !reportError && report

	return (
		<div className={cn('flex min-h-[65vh] flex-col', className)}>
			{isLoadingReport && (
				<div className="flex flex-1 items-center justify-center">
					<Spinner className="size-8 text-violet-400 dark:text-violet-500" />
				</div>
			)}

			{reportError && (
				<StateMessage
					title="Что-то пошло не так..."
					description="Попробуйте обновить страницу"
					descriptionClassName="text-sm"
					className="flex-1"
				/>
			)}

			{hasReport && (
				<>
					<ViewGithubStats username={report.githubUsername} />
					<ViewTopRepositories username={report.githubUsername} />
				</>
			)}
		</div>
	)
}
