import { apiClient } from '@/shared/api'

import { type ICodeQualityReport } from '../model'

export const fetchQualityReport = async (
	reportId: string
): Promise<ICodeQualityReport> => apiClient.request(`/api/reports/${reportId}`)
