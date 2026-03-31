import Link from 'next/link'

import { Container } from '@/shared/ui'
import { Logo } from '@/shared/ui/icons'
import { Route } from '@/shared/values'

export const Footer = () => (
	<footer className="text-muted-foreground/90 text-sm font-medium">
		<Container className="border-border flex flex-col items-center justify-between gap-2 border-t py-2 sm:flex-row">
			<span>Проектный практикум 2026</span>

			<Link
				href={Route.Home}
				className="order-first flex items-center gap-3 sm:order-0"
			>
				<Logo size="xs" className="opacity-70" />
				<span>DevAnalyzer</span>
			</Link>
		</Container>
	</footer>
)
