import { type Metadata } from 'next'
import Link from 'next/link'

import { buttonVariants } from '@/shared/ui/kit'

export const metadata: Metadata = {
	title: 'Страница не найдена | DevAnalyzer',
	description:
		'Упс! Страница, которую вы ищете, не существует. Вернитесь на главную страницу.'
}

export default function NotFound() {
	return (
		<div className="mb-4 flex min-h-screen flex-col items-center justify-center px-4">
			<div className="space-y-4 text-center">
				<h1 className="text-5xl font-bold">404</h1>
				<h2 className="text-2xl font-semibold">Страница не найдена</h2>
				<p className="text-muted-foreground text-xl">
					Похоже, вы не там, где хотели быть.
				</p>
				<div className="flex flex-col items-center space-y-4">
					<Link
						href="/"
						className={buttonVariants({
							size: 'lg'
						})}
					>
						На главную
					</Link>
				</div>
			</div>
		</div>
	)
}
