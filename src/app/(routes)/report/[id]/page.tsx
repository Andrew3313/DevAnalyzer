import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/shared/helpers'
import { buttonVariants } from '@/shared/ui/kit'
import { Route } from '@/shared/values'

interface IReportPageProps {
	params: Promise<{ id: string }>
}

export default async function ReportPage({ params }: IReportPageProps) {
	const { id } = await params

	return (
		<>
			<Link
				href={Route.Home}
				className={cn(
					'mb-4',
					buttonVariants({ variant: 'ghost', size: 'lg' })
				)}
			>
				<ArrowLeft className="size-5" />
				<span>На главную</span>
			</Link>

			<div>Report {id}</div>
		</>
	)
}
