import { z } from 'zod'

import { extractGitHubUsername } from '../helpers'

export const AnalyzeCandidateSchema = z
	.object({
		candidateLink: z
			.string()
			.min(1, 'Ссылка не может быть пустой')
			.max(100, 'Ссылка слишком длинная')
	})
	.refine((data) => !!extractGitHubUsername(data.candidateLink), {
		message:
			'Формат: https://github.com/username, github.com/username или @username',
		path: ['candidateLink']
	})

export type TAnalyzeCandidateSchema = z.infer<typeof AnalyzeCandidateSchema>
