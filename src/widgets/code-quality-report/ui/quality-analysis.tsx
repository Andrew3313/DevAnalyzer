import { cn } from '@/shared/helpers'

import { type ICodeQualityReport } from '../model'

interface IQualityAnalysisProps {
	report?: ICodeQualityReport
	isLoading?: boolean
	className?: string
}

export const QualityAnalysis = ({
	report,
	className
}: IQualityAnalysisProps) => (
	<section className={cn('space-y-4', className)}>
		<h2 className="from-primary to-primary/60 mb-4 bg-linear-to-r bg-clip-text text-start text-xl font-bold tracking-tight text-transparent">
			🛠️ Детальный анализ качества кода
		</h2>

		{report?.overallScore}
	</section>
)
