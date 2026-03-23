import { type Metadata } from 'next'
import { Inter } from 'next/font/google'

import './styles/index.css'
import { cn } from '@/shared/helpers'

import { MainProvider } from './providers'

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-sans' })

export const metadata: Metadata = {
	title: 'DevAnalyzer'
}

interface IRootLayoutProps {
	children: React.ReactNode
}

export default function RootLayout({ children }: Readonly<IRootLayoutProps>) {
	return (
		<html
			lang="ru"
			suppressHydrationWarning
			className={cn('font-sans', inter.variable)}
		>
			<body className="flex min-h-screen flex-col antialiased">
				<MainProvider>{children}</MainProvider>
			</body>
		</html>
	)
}
