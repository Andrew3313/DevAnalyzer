import type { IRepositoryQualityMetrics, TRating } from '../model'

export const clampPercent = (value: number) => Math.min(Math.max(value, 0), 100)

export const getScannedRepositories = (
	repositories: IRepositoryQualityMetrics[]
) => repositories.filter((repository) => repository.metrics)

export const getRepositoryIssueTotal = ({
	metrics
}: IRepositoryQualityMetrics) =>
	metrics ? metrics.bugs + metrics.vulnerabilities + metrics.codeSmells : 0

export const getMaxIssueTotal = (repositories: IRepositoryQualityMetrics[]) =>
	Math.max(...repositories.map(getRepositoryIssueTotal), 1)

export const RATING_ORDER: readonly TRating[] = ['A', 'B', 'C', 'D', 'E']
export const getRatingCounts = (
	repositories: IRepositoryQualityMetrics[],
	getRating: (repository: IRepositoryQualityMetrics) => TRating | null
) =>
	RATING_ORDER.map((rating) => ({
		rating,
		count: repositories.filter(
			(repository) => getRating(repository) === rating
		).length
	}))

export const getTechStackFrequency = (
	repositories: IRepositoryQualityMetrics[]
) => {
	const frequency = new Map<string, number>()

	repositories.forEach(({ metrics }) => {
		metrics?.techStack.forEach((technology) => {
			frequency.set(technology, (frequency.get(technology) ?? 0) + 1)
		})
	})

	return Array.from(frequency, ([name, count]) => ({ name, count })).sort(
		(a, b) => b.count - a.count || a.name.localeCompare(b.name)
	)
}
