import { cn } from '@/shared/helpers'
import { Badge, BadgeColor } from '@/shared/ui/kit'

import { AnalysisStatus } from '../values'

const STATUS_LABEL: Readonly<Record<AnalysisStatus, string>> = {
	[AnalysisStatus.PROCESSING]: 'В процессе...',
	[AnalysisStatus.FILTERING]: 'Фильтрация...',
	[AnalysisStatus.ANALYZING]: 'Анализ...',
	[AnalysisStatus.BUILDING_REPORT]: 'Создание отчета...',
	[AnalysisStatus.COMPLETED]: 'Завершено!',
	[AnalysisStatus.FAILED]: 'Ошибка анализа'
}

const STATUS_STYLES: Readonly<Record<AnalysisStatus, BadgeColor>> = {
	[AnalysisStatus.PROCESSING]: BadgeColor.Blue,
	[AnalysisStatus.FILTERING]: BadgeColor.Gray,
	[AnalysisStatus.ANALYZING]: BadgeColor.Yellow,
	[AnalysisStatus.BUILDING_REPORT]: BadgeColor.Purple,
	[AnalysisStatus.COMPLETED]: BadgeColor.Green,
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
