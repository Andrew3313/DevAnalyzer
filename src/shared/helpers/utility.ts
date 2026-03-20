export type Keys<T> = keyof T
export type Values<T> = T[Keys<T>]

export type EnsureParamObject<
	T extends Record<string, Record<string, V>>,
	V
> = T
