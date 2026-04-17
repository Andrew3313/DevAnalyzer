'use client'

import { useGithubStats } from '../hooks'
import { GithubStatsControlled } from './github-stats-controlled'

interface IViewGithubStatsProps {
	username: string
	className?: string
}

export function ViewGithubStats({
	username,
	className
}: IViewGithubStatsProps) {
	const { stats, isLoadingStats, statsError } = useGithubStats(username)

	return (
		<GithubStatsControlled
			stats={stats}
			isLoading={isLoadingStats}
			error={statsError}
			className={className}
		/>
	)
}
