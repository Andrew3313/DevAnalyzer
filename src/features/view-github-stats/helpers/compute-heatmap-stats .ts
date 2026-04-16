import { type IHeatmapWeekList } from '@/entities/candidate-stats/model'

export function computeHeatmapStats(heatmap: IHeatmapWeekList) {
	let totalContributions = 0
	let maxContributions = 0

	for (const week of heatmap) {
		totalContributions += week.total

		for (const count of week.days) {
			if (count > maxContributions) maxContributions = count
		}
	}

	return { totalContributions, maxContributions }
}
