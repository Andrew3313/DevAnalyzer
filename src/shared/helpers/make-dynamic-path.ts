import {
	Route,
	type TRouteParamValue,
	type TRouteDynamicParams
} from '@/shared/values'

const PARAM_REGEX = /:([a-zA-Z]+)/g

type TDynamicRoute = {
	[K in Route]: K extends `${string}:${string}` ? K : never
}[Route]

export const makeDynamicPath = <T extends TDynamicRoute>(
	route: T,
	params: TRouteDynamicParams[T]
): string =>
	route.replace(PARAM_REGEX, (_, key) => {
		if (!(key in params)) {
			throw new Error(`Missing parameter "${key}" for route "${route}"`)
		}

		return String((params as Record<string, TRouteParamValue>)[key])
	})
