import {
	BookMarked,
	Calendar,
	GitCommitHorizontal,
	GitFork,
	Star,
	Users
} from 'lucide-react'

import { cn, formatAge, formatNumber } from '@/shared/helpers'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/kit'

import { ActivityHeatmap } from './activity-heatmap'

import type { IStatItemConfig, TGithubStatsContent } from '../model'

const STAT_ITEMS: ReadonlyArray<IStatItemConfig> = [
	{
		key: 'repositories',
		icon: <BookMarked className="size-full" />,
		label: 'Репозиториев',
		iconClassName:
			'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
		formatter: (value) => formatNumber(value)
	},
	{
		key: 'stars',
		icon: <Star className="size-full" />,
		label: 'Звёзд получено',
		iconClassName:
			'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
		formatter: (value) => formatNumber(value)
	},
	{
		key: 'forks',
		icon: <GitFork className="size-full" />,
		label: 'Форков',
		iconClassName:
			'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400',
		formatter: (value) => formatNumber(value)
	},
	{
		key: 'followers',
		icon: <Users className="size-full" />,
		label: 'Подписчиков',
		iconClassName:
			'bg-pink-500/10 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400',
		formatter: (value) => formatNumber(value)
	},
	{
		key: 'commits',
		icon: <GitCommitHorizontal className="size-full" />,
		label: 'Коммитов за год',
		iconClassName:
			'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
		formatter: (value) => formatNumber(value)
	},
	{
		key: 'ageInDays',
		icon: <Calendar className="size-full" />,
		label: 'На GitHub',
		iconClassName:
			'bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400',
		formatter: (value) => formatAge(value)
	}
]

interface IGithubStatsContentProps extends TGithubStatsContent {
	className?: string
}

export const GithubStatsContent = ({
	className,
	heatmap,
	...props
}: IGithubStatsContentProps) => (
	<div className={cn('flex flex-col gap-6 px-6', className)}>
		<div className="grid grid-cols-3 gap-3 md:grid-cols-6">
			{STAT_ITEMS.map(
				({ key, icon, label, formatter, iconClassName }) => (
					<Tooltip key={key}>
						<TooltipTrigger asChild>
							<div className="bg-secondary/60 dark:bg-card/50 flex cursor-default flex-col items-center gap-2 rounded-xl border border-transparent px-4 py-3 transition-colors duration-300 hover:border-violet-500">
								<div
									className={cn(
										'flex size-10 shrink-0 items-center justify-center rounded-lg',
										iconClassName
									)}
								>
									<span className="size-5">{icon}</span>
								</div>
								<span className="text-foreground w-full truncate text-center text-sm font-bold tabular-nums lg:text-lg">
									{formatter(props[key])}
								</span>
							</div>
						</TooltipTrigger>

						<TooltipContent side="bottom" className="font-medium">
							{label}: {formatter(props[key])}
						</TooltipContent>
					</Tooltip>
				)
			)}
		</div>

		<ActivityHeatmap heatmap={heatmap} />
	</div>
)
