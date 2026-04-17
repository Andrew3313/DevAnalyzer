import { cn } from '@/shared/helpers'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Skeleton
} from '@/shared/ui/kit'

interface IScanStatsSkeletonProps {
	className?: string
}

export const ScanStatsSkeleton = ({ className }: IScanStatsSkeletonProps) => (
	<Card className={cn('bg-card/50 overflow-hidden', className)}>
		<CardHeader>
			<CardTitle className="flex items-center gap-2">
				<Skeleton className="size-6" />
				<Skeleton className="h-6 w-54" />
			</CardTitle>
		</CardHeader>

		<CardContent className="flex flex-1 flex-col">
			<div className="mb-6 grid grid-cols-3 gap-6">
				{Array.from({ length: 3 }).map((_, i) => (
					<Skeleton key={i} className="h-21" />
				))}
			</div>

			<div className="mt-auto space-y-3">
				<div className="flex items-center justify-end md:justify-center">
					<Skeleton className="h-7 w-14" />
				</div>

				<Skeleton className="h-2 w-full" />

				<div className="flex justify-between">
					<Skeleton className="h-5 w-28" />
					<Skeleton className="h-5 w-28" />
				</div>
			</div>
		</CardContent>
	</Card>
)
