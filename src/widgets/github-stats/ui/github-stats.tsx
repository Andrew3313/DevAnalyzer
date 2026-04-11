'use client'

import { cn } from '@/shared/helpers'
import { StateMessage } from '@/shared/ui'
import { Card } from '@/shared/ui/kit'

import { useGithubStats } from '../hooks'
import { GithubStatsContent } from './github-stats-content'
import { GithubStatsHeader } from './github-stats-header'
import { GithubStatsSkeleton } from './github-stats-skeleton'

interface IGithubStatsProps {
	username: string
	className?: string
}

export function GithubStats({ username, className }: IGithubStatsProps) {
	const { stats, isLoadingStats, statsError } = useGithubStats(username)

	const hasStats = !isLoadingStats && !statsError && stats

	return (
		<Card
			className={cn(
				'border-border/50 bg-card/50 shadow-primary/5 mb-4 min-h-128 w-full overflow-hidden shadow-lg',
				className
			)}
		>
			<div className="h-1 bg-linear-to-r from-violet-400 to-indigo-400" />

			{isLoadingStats && <GithubStatsSkeleton />}

			{statsError && (
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
