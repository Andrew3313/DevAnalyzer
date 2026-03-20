import type { IProxy } from './types'

export function defineProxy({
	global,
	paths,
	handler
}: Partial<IProxy>): IProxy {
	return {
		global: global ?? true,
		paths: paths ?? [],
		handler: handler ?? (() => {})
	}
}
