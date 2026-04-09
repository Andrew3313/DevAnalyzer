export interface IHeatmapWeek {
	weekStart: string
	days: number[]
	total: number
}

export type IHeatmapWeekList = IHeatmapWeek[]

export interface IBasicGithubStats {
	githubId: number
	login: string
	name: string | null
	location: string | null
	company: string | null
	repositories: number
	stars: number
	forks: number
	followers: number
	commits: number
	ageInDays: number
	heatmap: IHeatmapWeekList
}
