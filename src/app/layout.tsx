import { Inter } from 'next/font/google'

import './styles/globals.css'
import { cn } from '@/shared/lib/utils'

import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-sans' })

export const metadata: Metadata = {
	title: 'DevAnalyzer'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" className={cn('font-sans', inter.variable)}>
			<body className="antialiased">{children}</body>
		</html>
	)
}
