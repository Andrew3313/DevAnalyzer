'use client'

import { useTopRepositories } from '../hooks'
import { TopRepositoriesControlled } from './top-repositories-controlled'

interface IViewTopRepositoriesProps {
	username: string
	className?: string
}

export function ViewTopRepositories({
	username,
	className
}: IViewTopRepositoriesProps) {
	const { repositories, isLoadingRepositories, repositoriesError } =
		useTopRepositories(username)

	return (
		<TopRepositoriesControlled
			repositories={repositories}
			isLoading={isLoadingRepositories}
			error={repositoriesError}
			className={className}
		/>
	)
}
