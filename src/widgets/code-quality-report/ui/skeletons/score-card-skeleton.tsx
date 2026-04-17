import { cn } from '@/shared/helpers'
import { Card, CardContent, CardHeader, Skeleton } from '@/shared/ui/kit'

interface IScoreCardSkeletonProps {
	className?: string
}

export const ScoreCardSkeleton = ({ className }: IScoreCardSkeletonProps) => (
	<Card className={cn('bg-card/50 overflow-hidden', className)}>
		<CardHeader>
			<Skeleton className="h-6 w-32" />
			<Skeleton className="h-5 w-54" />
		</CardHeader>

		<CardContent className="flex flex-col items-center justify-center">
			<Skeleton className="mb-4 h-45 w-45 rounded-full" />
			<Skeleton className="h-5 w-40" />
		</CardContent>
	</Card>
)
