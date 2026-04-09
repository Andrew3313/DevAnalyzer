import { cn } from '@/shared/helpers'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	Skeleton
} from '@/shared/ui/kit'

interface IRepositorySkeletonProps {
	count?: number
	gridCols?: {
		sm?: number
		lg?: number
	}
	className?: string
}

export function RepositorySkeleton({
	count = 4,
	gridCols = { sm: 2, lg: 3 },
	className
}: IRepositorySkeletonProps) {
	const gridClasses = cn(
		'grid grid-cols-1 gap-4',
		gridCols.sm && `sm:grid-cols-${gridCols.sm}`,
		gridCols.lg && `lg:grid-cols-${gridCols.lg}`,
		className
	)

	return (
		<div className={gridClasses}>
			{Array.from({ length: count }).map((_, i) => (
				<Card
					key={i}
					className="bg-card/50 overflow-hidden border border-transparent"
				>
					<CardHeader className="px-6">
						<div className="flex items-center gap-3">
							<Skeleton className="h-10 w-10 rounded-lg" />
							<Skeleton className="h-7 w-3/4" />
						</div>
					</CardHeader>
					<CardContent>
						<Skeleton className="h-5 w-full" />
					</CardContent>
					<CardFooter className="flex gap-1.5">
						<Skeleton className="h-5 w-16 rounded-4xl" />
						<Skeleton className="h-5 w-16 rounded-4xl" />
					</CardFooter>
				</Card>
			))}
		</div>
	)
}
