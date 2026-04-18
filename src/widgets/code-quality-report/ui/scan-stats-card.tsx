import { CheckCircle2, FolderGit2, ScanSearch, XCircle } from 'lucide-react'

import { Progress } from '@/shared/ui/kit'

import { getScanRate } from '../helpers'
import { type ICodeQualityReport } from '../model'
import { ReportChartCard } from './report-chart-card'
import { StatItem } from './stat-item'

interface IScanStatsCardProps extends Pick<
	ICodeQualityReport,
	| 'totalRepositories'
	| 'filteredRepositories'
	| 'verifiedRepositories'
	| 'successfulScans'
	| 'failedScans'
> {
	className?: string
}

export function ScanStatsCard({
	totalRepositories,
	filteredRepositories,
	verifiedRepositories,
	successfulScans,
	failedScans,
	className
}: IScanStatsCardProps) {
	const successRate = getScanRate(successfulScans, failedScans)

	const successRateLabel = `${successRate}%`
	const successText = `${successfulScans} успешно`
	const failedText = `${failedScans} с ошибками`

	return (
		<ReportChartCard
			icon={ScanSearch}
			title="Статистика сканирования"
			className={className}
			contentClassName="flex flex-1 flex-col"
		>
			<div className="mb-6 grid grid-cols-3 gap-6">
				<StatItem
					icon={FolderGit2}
					value={totalRepositories}
					sublabel="Всего"
				/>
				<StatItem
					icon={ScanSearch}
					value={filteredRepositories}
					sublabel="Отфильтровано"
				/>
				<StatItem
					icon={CheckCircle2}
					value={verifiedRepositories}
					sublabel="Проверено"
				/>
			</div>

			<div className="mt-auto space-y-3">
				<div className="flex items-center justify-end md:justify-center">
					<span className="text-lg font-semibold text-violet-400">
						{successRateLabel}
					</span>
				</div>

				<Progress
					value={successRate}
					className="h-2 bg-violet-500/20 *:data-[slot=progress-indicator]:bg-linear-to-r *:data-[slot=progress-indicator]:from-violet-500 *:data-[slot=progress-indicator]:to-indigo-500"
				/>

				<div className="flex justify-between text-sm">
					<div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
						<CheckCircle2 className="size-4" />
						<span>{successText}</span>
					</div>
					<div className="flex items-center gap-1.5 text-red-600 dark:text-red-400">
						<XCircle className="size-4" />
						<span>{failedText}</span>
					</div>
				</div>
			</div>
		</ReportChartCard>
	)
}
