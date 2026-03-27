import { Container } from '@/shared/ui'
import { Footer } from '@/widgets/footer/ui'
import { Header } from '@/widgets/header/ui'

interface IMainLayoutProps {
	children: React.ReactNode
}

export default async function MainLayout({
	children
}: Readonly<IMainLayoutProps>) {
	return (
		<>
			<Header />

			<main className="mb-4 grow">
				<Container>{children}</Container>
			</main>

			<Footer />
		</>
	)
}
