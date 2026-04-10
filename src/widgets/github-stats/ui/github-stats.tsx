'use client'

import { cn } from '@/shared/helpers'
import { Card } from '@/shared/ui/kit'

import { useGithubStats } from '../hooks'
import { GithubStatsHeader } from './github-stats-header'

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
				'border-border/50 bg-card/50 shadow-primary/5 mb-4 w-full overflow-hidden shadow-lg',
				className
			)}
		>
			<div className="h-1 bg-linear-to-r from-violet-400 to-indigo-400" />

			{isLoadingStats && <div>Loading</div>}

			{hasStats && (
				<GithubStatsHeader
					name={stats.name}
					login={stats.login}
					location={stats.location}
					company={stats.company}
				/>
			)}
		</Card>
	)
}
