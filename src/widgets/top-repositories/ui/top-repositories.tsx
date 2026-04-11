'use client'

import { RepositoryCard, RepositorySkeleton } from '@/entities/repository/ui'
import { StateMessage } from '@/shared/ui'
import { Card, CardContent } from '@/shared/ui/kit'

import { useTopRepositories } from '../hooks'

interface ITopRepositoriesProps {
	username: string
	className?: string
}

export function TopRepositories({
	username,
	className
}: ITopRepositoriesProps) {
	const { repositories, isLoadingRepositories, repositoriesError } =
		useTopRepositories(username)

	const isEmpty =
		!isLoadingRepositories &&
		!repositoriesError &&
		repositories &&
		!repositories.length

	const hasRepositories =
		!isLoadingRepositories &&
		!repositoriesError &&
		repositories &&
		!!repositories.length

	return (
		<section className={className}>
			<h2 className="from-primary to-primary/60 mb-4 bg-linear-to-r bg-clip-text text-start text-xl font-bold tracking-tight text-transparent">
				🔥 Топ репозитории
			</h2>

			{isLoadingRepositories && (
				<RepositorySkeleton count={4} gridCols={{ sm: 2, lg: 3 }} />
			)}

			{repositoriesError && (
				<StateMessage
					title="Ошибка загрузки репозиториев"
					titleClassName="text-xl"
				/>
			)}

			{isEmpty && (
				<Card>
					<CardContent className="text-muted-foreground text-center">
						У пользователя нет публичных репозиториев
					</CardContent>
				</Card>
			)}

			{hasRepositories && (
				<div className="animate-in fade-in duration-300">
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{repositories.map((repo) => (
							<RepositoryCard key={repo.url} repository={repo} />
						))}
					</div>
				</div>
			)}
		</section>
	)
}
