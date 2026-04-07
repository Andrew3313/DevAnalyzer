import { ArrowLeft } from 'lucide-react'
import { type Metadata } from 'next'

import { getServerUserData } from '@/entities/user/api'
import { LogoutButton } from '@/features/auth/ui'
import { LinkButton, StateMessage } from '@/shared/ui'
import { Separator } from '@/shared/ui/kit'
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
				linkText="На главную"
			/>
		)
	}

	const sidebarTopSlot = <UserInfo user={user} avatarUrl={avatarUrl} />
	const sidebarBottomSlot = (
		<div className="flex flex-col gap-3">
			<Separator />
			<LogoutButton />
		</div>
	)

	return (
		<>
			<LinkButton href={Route.Home} className="mb-4">
				<ArrowLeft className="size-5" />
				<span>На главную</span>
			</LinkButton>

			<div className="flex flex-col gap-4 md:flex-row lg:gap-6">
				<ProfileSidebar
					user={user}
					slots={{
						top: sidebarTopSlot,
						bottom: sidebarBottomSlot
					}}
				/>

				<div className="flex-1">{children}</div>
			</div>
		</>
	)
}
