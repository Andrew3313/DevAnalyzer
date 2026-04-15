import { apiClient } from '@/shared/api'

import type { IStartAnalysisRequest, IStartAnalysisResponse } from '../model'

export const startAnalysis = async (
	payload: IStartAnalysisRequest
): Promise<IStartAnalysisResponse> =>
	apiClient.request('/api/analysis', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	})
