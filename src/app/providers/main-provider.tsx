import { type PropsWithChildren } from 'react'

import { TooltipProvider } from '@/shared/ui/kit'

import { TanstackQueryProvider } from './tanstack-query-provider'
import { ThemeProvider } from './theme-provider'
import { ToastProvider } from './toast-provider'

export const MainProvider = ({ children }: PropsWithChildren<unknown>) => (
	<TanstackQueryProvider>
		<ThemeProvider
			attribute="class"
			defaultTheme="dark"
			enableSystem
			disableTransitionOnChange
		>
			<ToastProvider />
			<TooltipProvider delayDuration={100}>{children}</TooltipProvider>
		</ThemeProvider>
	</TanstackQueryProvider>
)
