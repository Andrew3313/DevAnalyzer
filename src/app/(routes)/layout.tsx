import { Container } from '@/shared/components'

interface IMainLayoutProps {
	children: React.ReactNode
}

export default function MainLayout({ children }: Readonly<IMainLayoutProps>) {
	return (
		<>
			<header>Header</header>

			<main className="grow">
				<Container>{children}</Container>
			</main>

			<footer>Footer</footer>
		</>
	)
}
