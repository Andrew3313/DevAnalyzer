import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

import { getServerUserData } from '@/entities/user/api'
import { getUserAccessFlags } from '@/entities/user/helpers'
import { isValidGitHubUsername } from '@/features/analyze-candidate/helpers'
import { ViewGithubStats } from '@/features/view-github-stats/ui'
import { ViewTopRepositories } from '@/features/view-top-repositories/ui'
import { cn } from '@/shared/helpers'
import { buttonVariants } from '@/shared/ui/kit'
import { Route } from '@/shared/values'

interface IReportPageProps {
	params: Promise<{ id: string }>
}

export default async function ReportPage({ params }: IReportPageProps) {
	const { id } = await params
	const { user } = await getServerUserData()

	const { isAuthenticated, isRegularUser, hasExtendedAccess } =
		getUserAccessFlags(user)

	if (!isAuthenticated) redirect(Route.Login)

	if (isRegularUser && !isValidGitHubUsername(id)) notFound()
	if (hasExtendedAccess && isValidGitHubUsername(id)) notFound()

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

			{hasExtendedAccess ? (
				<h3>Детальный отчёт по {id}</h3>
			) : (
				<>
					<ViewGithubStats username={id} />
					<ViewTopRepositories username={id} />
				</>
			)}
		</>
	)
}
