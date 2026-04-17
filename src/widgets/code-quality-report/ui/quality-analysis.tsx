import { cn } from '@/shared/helpers'

import { type ICodeQualityReport } from '../model'
import { ScoreCard } from './score-card'

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

			{hasAnalysis && (
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					<ScoreCard score={report.overallScore} />
				</div>
			)}
		</section>
	)
}
