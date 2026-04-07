import { type Metadata } from 'next'

import { StateMessage } from '@/shared/ui'

export const metadata: Metadata = {
	title: '404 | DevAnalyzer',
	description: 'Упс! Страница, которую вы ищете, не существует'
}

export default function NotFound() {
	return (
		<StateMessage
			title="404"
			subtitle="Страница не найдена"
			description="Похоже, вы не там, где хотели быть"
			linkText="На главную"
			className="mb-4 min-h-screen px-4"
		/>
	)
}
