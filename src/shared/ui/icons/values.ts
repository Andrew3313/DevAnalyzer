import { Keys } from '@/shared/helpers'

export const ICON_SIZES = {
	xs: 'w-5 h-5',
	sm: 'w-6 h-6',
	md: 'w-8 h-8',
	lg: 'w-10 h-10'
} as const

export type TIconSize = Keys<typeof ICON_SIZES>
