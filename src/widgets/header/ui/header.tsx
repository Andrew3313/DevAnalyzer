import Link from 'next/link'

import { getServerUserData } from '@/entities/user/api'
import { ToggleTheme } from '@/features/toggle-theme/ui'
import { Container } from '@/shared/ui'
import { Logo } from '@/shared/ui/icons'
import { buttonVariants } from '@/shared/ui/kit'
import { Route } from '@/shared/values'

import { UserProfileLink } from './user-profile-link'

export async function Header() {
	const { user, avatarUrl } = await getServerUserData()

	return (
		<header className="mb-4">
			<Container className="border-border flex items-center justify-between border-b py-2">
				<Link
					href={Route.Home}
					className="flex items-center gap-3 focus:outline-none"
				>
					<Logo />
					<span className="hidden text-xl font-bold sm:inline">
						DevAnalyzer
					</span>
				</Link>

				<div className="flex items-center gap-3">
					<ToggleTheme />

					{user ? (
						<UserProfileLink user={user} avatarUrl={avatarUrl} />
					) : (
						<Link href={Route.Login} className={buttonVariants()}>
							Войти в аккаунт
						</Link>
					)}
				</div>
			</Container>
		</header>
	)
}
