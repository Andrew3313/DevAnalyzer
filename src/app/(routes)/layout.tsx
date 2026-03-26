import { getServerUser } from '@/entities/user/api'
import { ToggleTheme } from '@/features/toggle-theme/ui'
import { Container } from '@/shared/ui'
import { Logo } from '@/shared/ui/icons'

interface IMainLayoutProps {
	children: React.ReactNode
}

export default async function MainLayout({
	children
}: Readonly<IMainLayoutProps>) {
	const user = await getServerUser()

	return (
		<>
			<header className="flex items-center justify-between p-2">
				<Logo size="lg" />
				<div className="flex items-center gap-2">
					<ToggleTheme />
					{user && (
						<span>
							{user.firstName} {user.lastName}
						</span>
					)}
				</div>
			</header>

			<main className="grow">
				<Container>{children}</Container>
			</main>

			<footer>Footer</footer>
		</>
	)
}
