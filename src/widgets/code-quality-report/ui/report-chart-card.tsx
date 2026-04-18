import { type LucideIcon } from 'lucide-react'
import { type ReactNode } from 'react'

import { cn } from '@/shared/helpers'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/shared/ui/kit'

interface IReportChartCardProps {
	icon: LucideIcon
	title: string
	children: ReactNode
	description?: string
	action?: ReactNode
	className?: string
	contentClassName?: string
}

export const ReportChartCard = ({
	icon: Icon,
	title,
	description,
	children,
	action,
	className,
	contentClassName
}: IReportChartCardProps) => (
	<Card
		className={cn(
			'border-border/50 bg-card/50 shadow-primary/5 overflow-hidden shadow-lg',
			className
		)}
	>
		<CardHeader>
			<div className="flex items-start justify-between gap-4">
				<div className="min-w-0 space-y-1">
					<CardTitle className="flex items-center gap-2">
						<Icon className="size-5 shrink-0 text-violet-400" />
						<span className="truncate">{title}</span>
					</CardTitle>

					{description && (
						<CardDescription>{description}</CardDescription>
					)}
				</div>

				{action}
			</div>
		</CardHeader>

		<CardContent className={contentClassName}>{children}</CardContent>
	</Card>
)
