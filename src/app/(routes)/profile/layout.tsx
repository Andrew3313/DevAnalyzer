import { ArrowLeft } from 'lucide-react'
import { type Metadata } from 'next'
import Link from 'next/link'

import { getServerUserData } from '@/entities/user/api'
import { cn } from '@/shared/helpers'
import { StateMessage } from '@/shared/ui'
import { buttonVariants } from '@/shared/ui/kit'
import { Route } from '@/shared/values'
import { ProfileSidebar } from '@/widgets/profile-sidebar/ui'
import { UserInfo } from '@/widgets/user-info/ui'

export const metadata: Metadata = {
	title: {
		default: 'Профиль | DevAnalyzer',
		template: '%s | Профиль | DevAnalyzer'
	},
	description: 'Управление профилем пользователя в DevAnalyzer'
}

interface IProfileLayoutProps {
	children: React.ReactNode
}

export default async function ProfileLayout({
	children
}: Readonly<IProfileLayoutProps>) {
	const { user, avatarUrl } = await getServerUserData()

	if (!user) {
		return (
			<StateMessage
				title="Доступ ограничен"
				description="Пожалуйста, войдите в аккаунт, чтобы просмотреть эту страницу"
				buttonText="На главную"
			/>
		)
	}

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

			<div className="flex flex-col gap-4 md:flex-row md:gap-6">
				<ProfileSidebar
					user={user}
					slots={{
						top: <UserInfo user={user} avatarUrl={avatarUrl} />
					}}
				/>

				<div className="flex-1">{children}</div>
			</div>
		</>
	)
}
