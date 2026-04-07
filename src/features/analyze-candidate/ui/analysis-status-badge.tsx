import { cn } from '@/shared/helpers'
import { Badge, BadgeColor } from '@/shared/ui/kit'

import { AnalysisStatus } from '../values'

const STATUS_LABEL: Record<AnalysisStatus, string> = {
	[AnalysisStatus.PROCESSING]: 'В процессе...',
	[AnalysisStatus.FILTERING]: 'Фильтрация...',
	[AnalysisStatus.DEEP_ANALYSIS]: 'Глубокий анализ...',
	[AnalysisStatus.DONE]: 'Завершено!',
	[AnalysisStatus.FAILED]: 'Ошибка анализа'
}

const STATUS_STYLES: Record<AnalysisStatus, BadgeColor> = {
	[AnalysisStatus.PROCESSING]: BadgeColor.Blue,
	[AnalysisStatus.FILTERING]: BadgeColor.Gray,
	[AnalysisStatus.DEEP_ANALYSIS]: BadgeColor.Yellow,
	[AnalysisStatus.DONE]: BadgeColor.Green,
	[AnalysisStatus.FAILED]: BadgeColor.Red
}

interface IAnalysisStatusBadgeProps {
	status: AnalysisStatus
	className?: string
}

export const AnalysisStatusBadge = ({
	status,
	className
}: IAnalysisStatusBadgeProps) => (
	<Badge className={cn(STATUS_STYLES[status], className)}>
		{STATUS_LABEL[status]}
	</Badge>
)
