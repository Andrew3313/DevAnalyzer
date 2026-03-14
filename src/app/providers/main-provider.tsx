import { type PropsWithChildren } from 'react'

import { TanstackQueryProvider } from './tanstack-query-provider'
import { ThemeProvider } from './theme-provider'

export function MainProvider({ children }: PropsWithChildren<unknown>) {
	return (
		<TanstackQueryProvider>
			<ThemeProvider
				attribute="class"
				defaultTheme="dark"
				enableSystem
				disableTransitionOnChange
			>
				{children}
			</ThemeProvider>
		</TanstackQueryProvider>
	)
}
