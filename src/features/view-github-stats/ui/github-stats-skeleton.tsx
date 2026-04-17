import { cn } from '@/shared/helpers'
import { Skeleton } from '@/shared/ui/kit'

interface IGithubStatsSkeletonProps {
	withHeatmap?: boolean
	className?: string
}

export const GithubStatsSkeleton = ({
	withHeatmap = true,
	className
}: IGithubStatsSkeletonProps) => (
	<div className={cn('flex flex-col gap-6 px-6', className)}>
		<div className="flex flex-col gap-1">
			<div className="flex items-center gap-3">
				<Skeleton className="h-8 w-48" />
				<Skeleton className="h-6.5 w-24 rounded-full" />
			</div>
			<div className="flex gap-3">
				<Skeleton className="h-5 w-32" />
				<Skeleton className="h-5 w-28" />
			</div>
		</div>

		<div className="flex flex-col gap-6">
			<div className="grid grid-cols-3 gap-3 md:grid-cols-6">
				{Array.from({ length: 6 }).map((_, i) => (
					<div
						key={i}
						className="bg-secondary/60 dark:bg-card/50 flex flex-col items-center gap-2 rounded-xl border border-transparent px-4 py-3"
					>
						<Skeleton className="size-10 rounded-lg" />
						<Skeleton className="h-7 w-18" />
					</div>
				))}
			</div>
		</div>

		{withHeatmap && (
			<div
				className={cn(
					'bg-secondary/60 dark:bg-card/50 flex flex-col gap-4 overflow-hidden rounded-xl p-4',
					className
				)}
			>
				<div className="flex items-center justify-between gap-6">
					<Skeleton className="h-9.5 w-24" />
					<Skeleton className="h-5 w-24" />
				</div>

				<Skeleton className="h-34 w-full" />

				<div className="flex flex-col items-center gap-1.5 text-xs sm:flex-row sm:justify-between">
					<Skeleton className="h-4 w-30" />
					<Skeleton className="h-4 w-26 md:w-54" />
				</div>
			</div>
		)}
	</div>
)
