export function getScanRate(successful: number, failed: number) {
	const total = successful + failed

	if (total <= 0) return 0

	return Math.round((successful / total) * 100)
}
