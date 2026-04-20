'use client'

import { Heart, Loader2 } from 'lucide-react'

import { cn } from '@/shared/helpers'
import { Button } from '@/shared/ui/kit'

interface IAddFavoriteReportButtonProps {
	isFavorite: boolean
	isLoading?: boolean
	disabled?: boolean
	withLabel?: boolean
	onToggleFavorite: () => void
	className?: string
}

export function AddFavoriteReportButton({
	isFavorite,
	isLoading,
	disabled,
	withLabel = false,
	onToggleFavorite,
	className
}: IAddFavoriteReportButtonProps) {
	const label = isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'

	return (
		<Button
			type="button"
			variant="outline"
			size={withLabel ? 'lg' : 'icon-lg'}
			aria-pressed={isFavorite}
			aria-label={label}
			title={label}
			disabled={disabled || isLoading}
			onClick={onToggleFavorite}
			className={cn(
				'group/favorite rounded-xl border-violet-400/50 bg-linear-to-r from-violet-400/10 to-indigo-400/10 text-violet-600 shadow-sm shadow-violet-500/10 backdrop-blur',
				'hover:border-violet-400 hover:from-violet-400/20 hover:to-indigo-400/20 hover:text-violet-700 hover:shadow-violet-500/20',
				'focus-visible:border-violet-400 focus-visible:ring-violet-400/30',
				'dark:border-violet-400/35 dark:text-violet-200 dark:hover:border-violet-300/70 dark:hover:text-violet-100',
				isFavorite &&
					'border-rose-400/60 from-rose-500/15 to-red-500/10 text-rose-600 shadow-rose-500/20 hover:border-rose-400 hover:from-rose-500/25 hover:to-red-500/15 hover:text-rose-700 focus-visible:border-rose-400 focus-visible:ring-rose-400/30 dark:border-rose-400/45 dark:text-rose-200 dark:hover:border-rose-300/70 dark:hover:text-rose-100',
				withLabel && 'w-full gap-2 sm:w-auto',
				className
			)}
		>
			{isLoading ? (
				<Loader2 className="size-4 animate-spin" />
			) : (
				<Heart
					className={cn(
						'size-4 transition-colors',
						isFavorite
							? 'fill-rose-500 text-rose-500 dark:fill-rose-400 dark:text-rose-400'
							: 'fill-transparent text-current group-hover/favorite:fill-violet-400/20'
					)}
				/>
			)}

			{withLabel && <span className="min-w-0 truncate">{label}</span>}
		</Button>
	)
}
