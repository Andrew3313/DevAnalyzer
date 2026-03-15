export type TNextOptions = NextFetchRequestConfig

export interface TRequestOptions<
	TQueryParams extends Record<string, string | number | boolean> = Record<
		string,
		string | number | boolean
	>
> extends RequestInit {
	queryParams?: TQueryParams
	nextOptions?: TNextOptions
}
