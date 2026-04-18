import { type ReactNode } from 'react'

import { cn } from '@/shared/helpers'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Skeleton
} from '@/shared/ui/kit'

interface IReportChartCardSkeletonProps {
	children: ReactNode
	className?: string
}

export const ReportChartCardSkeleton = ({
	children,
	className
}: IReportChartCardSkeletonProps) => (
	<Card className={cn('bg-card/50 overflow-hidden', className)}>
		<CardHeader className="gap-2">
			<CardTitle className="flex items-center gap-2">
				<Skeleton className="size-5" />
				<Skeleton className="h-6 w-48" />
			</CardTitle>
			<Skeleton className="h-5 w-72 max-w-full" />
		</CardHeader>

		<CardContent>{children}</CardContent>
	</Card>
)
