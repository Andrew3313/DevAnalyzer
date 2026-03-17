import { ToggleTheme } from '@/features/toggle-theme/ui'
import { Container } from '@/shared/ui'
import { Logo } from '@/shared/ui/icons'

interface IMainLayoutProps {
	children: React.ReactNode
}

export default function MainLayout({ children }: Readonly<IMainLayoutProps>) {
	return (
		<>
			<header className="flex items-center justify-between p-2">
				<Logo size="lg" />
				<ToggleTheme />
			</header>

			<main className="grow">
				<Container>{children}</Container>
			</main>

			<footer>Footer</footer>
		</>
	)
}
