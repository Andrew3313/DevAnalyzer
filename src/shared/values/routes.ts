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
	RefreshPassword = '/reset-password'
}

export type TRouteParamValue = string | number
export type TRouteDynamicParams = EnsureParamObject<
	{
		[Route.Report]: { username: string }
	},
	TRouteParamValue
>
