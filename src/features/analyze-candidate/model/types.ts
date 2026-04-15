import { AnalysisStatus } from '../values'

export interface IStartAnalysisRequest {
	githubUsername: string
	languages: string[]
	techStack: string[]
}

export interface IStartAnalysisResponse {
	requestId: string
	userId: number
	status: string
	createdAt: string
}

export interface IAnalysisWSMessage {
	requestId: string
	status: AnalysisStatus
	timestamp: number
}
