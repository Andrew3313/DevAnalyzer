export enum Route {
	Home = '/',
	Compare = '/compare',
	Profile = '/profile',
	ReportsHistory = '/profile/reports-history',
	Favorites = '/profile/favorites',
	Security = '/profile/security',
	Report = '/report',
	Login = '/login',
	Register = '/register',
	RefreshPassword = '/refresh-password'
}

export const ROUTES_LIST = Object.values(Route)
