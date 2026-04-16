import { useQuery } from '@tanstack/react-query'

import { fetchQualityReport } from '../api'

export function useQualityReport(reportId: string) {
	const {
		data: report,
		isLoading: isLoadingReport,
		error: reportError
	} = useQuery({
		queryKey: ['quality-report', reportId],
		queryFn: () => fetchQualityReport(reportId),
		enabled: !!reportId,
		staleTime: 60 * 1000 * 10
	})

	return {
		report,
		isLoadingReport,
		reportError
	}
}
