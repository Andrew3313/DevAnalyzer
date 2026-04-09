import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getServerUserData } from '@/entities/user/api'
import { UserRole } from '@/entities/user/values'
import { isValidGitHubUsername } from '@/features/analyze-candidate/helpers'
import { cn } from '@/shared/helpers'
import { type TSearchParams } from '@/shared/model'
import { buttonVariants } from '@/shared/ui/kit'
import { Route } from '@/shared/values'
import { TopRepositories } from '@/widgets/top-repositories/ui'

interface IReportPageProps {
	params: Promise<{ username: string }>
	searchParams: TSearchParams
}

export default async function ReportPage({
	params,
	searchParams
}: IReportPageProps) {
	const { username } = await params
	const reportId = [(await searchParams).reportId].flat()[0]

	if (!isValidGitHubUsername(username)) redirect(Route.Home)

	const { user } = await getServerUserData()
	const showMoreAnalysis = !!reportId && !!user && user.role !== UserRole.USER

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

			<TopRepositories username={username} />

			{showMoreAnalysis && <h3>Расширенный анализ</h3>}
		</>
	)
}
