import { Route } from '@/shared/values'

export const PUBLIC_AUTH_PAGES: ReadonlyArray<Route> = [
	Route.Login,
	Route.Register
]

export const PRIVATE_PATH_PREFIXES: ReadonlyArray<string> = [
	'/profile',
	'/report'
]
