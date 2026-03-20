import { EnsureParamObject } from '@/shared/helpers'

export enum Route {
	Home = '/',
	Compare = '/compare',
	Profile = '/profile',
	ReportsHistory = '/profile/reports-history',
	Favorites = '/profile/favorites',
	Security = '/profile/security',
	Report = '/report/:username',
	Login = '/login',
	Register = '/register',
	RefreshPassword = '/refresh-password'
}

export type TRouteParamValue = string | number
export type TRouteDynamicParams = EnsureParamObject<
	{
		[Route.Report]: { username: string }
	},
	TRouteParamValue
>

export const ROUTES_LIST = Object.values(Route)
