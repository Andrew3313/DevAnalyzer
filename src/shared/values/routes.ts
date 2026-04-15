import { EnsureParamObject } from '@/shared/helpers'

export enum Route {
	Home = '/',
	Profile = '/profile',
	Favorites = '/profile/favorites',
	Security = '/profile/security',
	Report = '/report/:id',
	Login = '/login',
	Register = '/register',
	ResetPassword = '/reset-password'
}

export type TRouteParamValue = string | number
export type TRouteDynamicParams = EnsureParamObject<
	{
		[Route.Report]: { id: string }
	},
	TRouteParamValue
>
