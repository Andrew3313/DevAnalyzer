export interface IFavoriteReport {
	requestId: string
	githubUsername: string
	overallScore: number
	totalRepositories: number
	verifiedRepositories: number
	successfulScans: number
	createdAt: string
}

export interface IFavoriteReportsParams {
	limit: number
	offset: number
}
