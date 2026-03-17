'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/shared/ui/kit'

export function ToggleTheme() {
	const { theme, setTheme } = useTheme()

	const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

	return (
		<Button
			variant="outline"
			size="icon"
			className="rounded-full"
			onClick={toggleTheme}
		>
			<Sun className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
			<Moon className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
			<span className="sr-only">Переключить тему</span>
		</Button>
	)
}
