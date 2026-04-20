import { Card, CardContent, CardFooter, Skeleton } from '@/shared/ui/kit'

export const FavoriteReportCardSkeleton = () => (
	<Card className="border-border/50 bg-card/50 relative h-full overflow-hidden backdrop-blur-sm">
		<div className="relative z-10 flex items-start gap-4 px-6">
			<Skeleton className="size-14 rounded-lg" />

			<div className="min-w-0 flex-1 space-y-2">
				<div className="flex items-center gap-2">
					<Skeleton className="h-7 w-40" />
					<Skeleton className="size-4 rounded-md" />
				</div>

				<Skeleton className="h-4 w-36" />
			</div>
		</div>

		<CardContent className="relative z-10 flex items-center justify-center pt-7">
			<Skeleton className="size-28 rounded-full" />
		</CardContent>

		<CardFooter className="relative z-10 flex flex-col items-center gap-2 px-6">
			<Skeleton className="h-9 w-40 rounded-lg" />
			<Skeleton className="h-9 w-36 rounded-lg" />
			<Skeleton className="h-9 w-32 rounded-lg" />
		</CardFooter>
	</Card>
)
