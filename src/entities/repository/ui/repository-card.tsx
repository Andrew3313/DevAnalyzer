import { Code, ExternalLink, GitFork, Star } from 'lucide-react'
import Link from 'next/link'

import { cn, formatNumber } from '@/shared/helpers'
import { Logo } from '@/shared/ui/icons'
import {
	Badge,
	Card,
	CardContent,
	CardDescription,
	CardFooter
} from '@/shared/ui/kit'

import { type IRepository } from '../model'

interface IRepositoryCardProps {
	repository: IRepository
	className?: string
}

export const RepositoryCard = ({
	repository,
	className
}: IRepositoryCardProps) => (
	<Link
		href={repository.url}
		target="_blank"
		rel="noopener noreferrer"
		className={cn(
			'group focus-visible:border-ring focus-visible:ring-ring/50 block cursor-pointer rounded-xl border border-transparent focus:outline-none focus-visible:ring-1',
			className
		)}
	>
		<Card className="border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card hover:shadow-primary/5 relative h-full overflow-hidden backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg">
			<div className="from-primary/5 absolute inset-0 bg-linear-to-br via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

			<div className="absolute -right-6 -bottom-6 opacity-35 transition-all duration-500 group-hover:-right-4 group-hover:-bottom-1">
				<Logo className="size-28" />
			</div>

			<div className="relative z-10 px-6">
				<div className="flex items-start justify-between gap-4">
					<div className="flex min-w-0 flex-1 items-center gap-3">
						<div className="bg-primary/7 text-primary group-hover:text-primary-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 group-hover:bg-violet-400">
							<Code className="size-5" />
						</div>

						<h3 className="text-foreground truncate text-lg font-semibold">
							{repository.name}
						</h3>
					</div>

					<ExternalLink className="size-5 shrink-0 text-violet-400 opacity-0 transition-all duration-300 group-hover:opacity-100" />
				</div>
			</div>

			<CardContent className="relative z-10">
				{repository.description ? (
					<CardDescription className="text-muted-foreground truncate text-sm leading-relaxed">
						{repository.description}
					</CardDescription>
				) : (
					<CardDescription className="text-muted-foreground/60 text-sm">
						Нет описания
					</CardDescription>
				)}
			</CardContent>

			<CardFooter className="relative z-10 flex items-center gap-1.5">
				<Badge
					variant="secondary"
					className="bg-secondary/80 gap-1.5 px-2.5 py-1 text-xs font-medium transition-colors duration-300 group-hover:bg-amber-500/10 group-hover:text-amber-600 dark:group-hover:text-amber-400"
				>
					<Star className="size-3.5 fill-current" />
					{formatNumber(repository.stars)}
				</Badge>
				<Badge
					variant="secondary"
					className="bg-secondary/80 gap-1.5 px-2.5 py-1 text-xs font-medium transition-colors duration-300 group-hover:bg-blue-500/10 group-hover:text-blue-600 dark:group-hover:text-blue-400"
				>
					<GitFork className="size-3.5" />
					{formatNumber(repository.forks)}
				</Badge>
			</CardFooter>
		</Card>
	</Link>
)
