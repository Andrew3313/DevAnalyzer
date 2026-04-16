import { type IGithubStats } from '@/entities/candidate-stats/model'
import { type Keys } from '@/shared/helpers'

export type TGithubStatsHeader = Pick<
	IGithubStats,
	'login' | 'name' | 'location' | 'company'
>

export type TGithubStatsContent = Omit<
	IGithubStats,
	Keys<TGithubStatsHeader> | 'githubId'
>

export interface IStatItemConfig {
	icon: React.ReactNode
	label: string
	key: Keys<Omit<TGithubStatsContent, 'heatmap'>>
	iconClassName: string
	formatter: (value: number) => string
}
