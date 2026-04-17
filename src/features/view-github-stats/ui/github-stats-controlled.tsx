import { type IGithubStats } from '@/entities/candidate-stats/model'
import { cn } from '@/shared/helpers'
import { StateMessage } from '@/shared/ui'
import { Card } from '@/shared/ui/kit'

import { GithubStatsContent } from './github-stats-content'
import { GithubStatsHeader } from './github-stats-header'
import { GithubStatsSkeleton } from './github-stats-skeleton'

interface IGithubStatsControlledProps {
	stats?: IGithubStats
	isLoading?: boolean
	error?: Error | null
	withSkeletonHeatmap?: boolean
	className?: string
}

export function GithubStatsControlled({
	stats,
	isLoading,
	error,
	withSkeletonHeatmap = true,
	className
}: IGithubStatsControlledProps) {
	const hasStats = !isLoading && !error && stats

	return (
		<Card
			className={cn(
				'border-border/50 bg-card/50 shadow-primary/5 w-full overflow-hidden shadow-lg',
				className
			)}
		>
			<div className="h-1 bg-linear-to-r from-violet-400 to-indigo-400" />

			{isLoading && (
				<GithubStatsSkeleton withHeatmap={withSkeletonHeatmap} />
			)}

			{error && (
				<StateMessage
					title="Что-то пошло не так..."
					description="Попробуйте обновить страницу"
					titleClassName="text-xl"
					descriptionClassName="text-sm"
					className="flex-1"
				/>
			)}

			{hasStats && (
				<>
					<GithubStatsHeader
						name={stats.name}
						login={stats.login}
						location={stats.location}
						company={stats.company}
					/>

					<GithubStatsContent
						repositories={stats.repositories}
						forks={stats.forks}
						stars={stats.stars}
						followers={stats.followers}
						commits={stats.commits}
						ageInDays={stats.ageInDays}
						heatmap={stats.heatmap}
					/>
				</>
			)}
		</Card>
	)
}
