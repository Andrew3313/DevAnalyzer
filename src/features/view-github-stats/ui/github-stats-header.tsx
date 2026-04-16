import { Building2, MapPin } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/shared/helpers'

import { type TGithubStatsHeader } from '../model'

interface IGithubStatsHeaderProps extends TGithubStatsHeader {
	className?: string
}

export const GithubStatsHeader = ({
	name,
	login,
	location,
	company,
	className
}: IGithubStatsHeaderProps) => (
	<div className={cn('px-6', className)}>
		<div className="flex flex-col gap-1">
			<div className="flex items-center gap-3">
				{name && (
					<h2 className="text-foreground truncate text-2xl font-bold tracking-tight">
						{name}
					</h2>
				)}

				<Link
					href={`https://github.com/${login}`}
					target="_blank"
					rel="noopener noreferrer"
					className="focus-visible:border-ring focus-visible:ring-ring/50 truncate rounded-full border border-violet-500/20 bg-violet-500/10 px-2 py-0.5 text-sm text-violet-500 transition-all hover:opacity-85 focus:outline-none focus-visible:ring-1 dark:text-violet-400"
				>
					@{login}
				</Link>
			</div>

			{(location || company) && (
				<div className="text-muted-foreground flex flex-wrap items-center gap-3 text-sm">
					{location && (
						<span className="flex items-center gap-1.5">
							<MapPin className="text-primary/70 size-3.5 shrink-0" />
							{location}
						</span>
					)}
					{company && (
						<span className="flex items-center gap-1.5">
							<Building2 className="text-primary/70 size-3.5 shrink-0" />
							{company}
						</span>
					)}
				</div>
			)}
		</div>
	</div>
)
