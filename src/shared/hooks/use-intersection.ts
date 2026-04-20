import { useCallback, useRef } from 'react'

export function useIntersection(
	onIntersect: () => void,
	options?: IntersectionObserverInit
) {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)

	return useCallback(
		(el: HTMLDivElement | null) => {
			if (!el) return

			const observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						if (timeoutRef.current) {
							clearTimeout(timeoutRef.current)
						}
						timeoutRef.current = setTimeout(() => {
							onIntersect()
						}, 300)
					}
				})
			}, options)

			observer.observe(el)

			return () => {
				observer.disconnect()
				if (timeoutRef.current) {
					clearTimeout(timeoutRef.current)
				}
			}
		},
		[onIntersect, options]
	)
}
