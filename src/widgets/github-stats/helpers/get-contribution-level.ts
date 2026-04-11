import { ContributionLevel } from '../values'

export function getContributionLevel(count: number): ContributionLevel {
	if (count === 0) return ContributionLevel.None
	if (count <= 3) return ContributionLevel.Low
	if (count <= 6) return ContributionLevel.Medium
	if (count <= 9) return ContributionLevel.High

	return ContributionLevel.VeryHigh
}
