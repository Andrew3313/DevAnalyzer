export interface IRepository {
	name: string
	description: string | null
	url: string
	stars: number
	forks: number
}

export type IRepositoryList = IRepository[]
