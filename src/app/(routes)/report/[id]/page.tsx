import { ArrowLeft } from 'lucide-react'

import { LinkButton } from '@/shared/ui'
import { Route } from '@/shared/values'

interface IReportPageProps {
	params: Promise<{ id: string }>
}

export default async function ReportPage({ params }: IReportPageProps) {
	const { id } = await params

	return (
		<>
			<LinkButton href={Route.Home} className="mb-4">
				<ArrowLeft className="size-5" />
				<span>На главную</span>
			</LinkButton>

			<div>Report {id}</div>
		</>
	)
}
