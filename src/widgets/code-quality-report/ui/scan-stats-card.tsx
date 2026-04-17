import { CheckCircle2, FolderGit2, ScanSearch, XCircle } from 'lucide-react'

import { cn } from '@/shared/helpers'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Progress
} from '@/shared/ui/kit'

import { getScanRate } from '../helpers'
import { type ICodeQualityReport } from '../model'
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
		<Card
			className={cn(
				'border-border/50 bg-card/50 shadow-primary/5 overflow-hidden shadow-lg',
				className
			)}
		>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<ScanSearch className="size-5 text-violet-400" />
					Статистика сканирования
				</CardTitle>
			</CardHeader>

			<CardContent className="flex flex-1 flex-col">
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
			</CardContent>
		</Card>
	)
}
