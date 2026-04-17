import { type IRepositoryList } from '@/entities/repository/model'
import { RepositoryCard, RepositorySkeleton } from '@/entities/repository/ui'
import { StateMessage } from '@/shared/ui'
import { Card, CardContent } from '@/shared/ui/kit'

interface ITopRepositoriesControlledProps {
	repositories?: IRepositoryList
	isLoading?: boolean
	error?: Error | null
	className?: string
}

export function TopRepositoriesControlled({
	repositories,
	isLoading,
	error,
	className
}: ITopRepositoriesControlledProps) {
	const isEmpty = !isLoading && !error && repositories && !repositories.length

	const hasRepositories =
		!isLoading && !error && repositories && !!repositories.length

	return (
		<section className={className}>
			<h2 className="from-primary to-primary/60 mb-4 bg-linear-to-r bg-clip-text text-start text-xl font-bold tracking-tight text-transparent">
				🔥 Топ репозитории
			</h2>

			{isLoading && (
				<RepositorySkeleton count={4} gridCols={{ sm: 2, lg: 3 }} />
			)}

			{error && (
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
