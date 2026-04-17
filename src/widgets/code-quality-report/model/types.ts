import { type IGithubStats } from '@/entities/candidate-stats/model'
import { type IRepositoryList } from '@/entities/repository/model'

export type TRating = 'A' | 'B' | 'C' | 'D' | 'E' // Where A is the best
export type TRepositoryScanStatus = 'SUCCESS' | 'FAILED'
export type TQualityGateStatus = 'OK' | 'ERROR'

export interface ICodeQualityReport {
	githubUsername: string
	totalRepositories: number
	filteredRepositories: number
	verifiedRepositories: number
	successfulScans: number
	failedScans: number
	overallScore: number // 0-100
	summary: IQualityReportSummary
	techStackAnalysis: ITechStackAnalysis
	repositories: IRepositoryQualityMetrics[]
	gitHubStats: IGithubStats
	gitHubRepo: IRepositoryList
}

// Summary of all repositories
export interface IQualityReportSummary {
	totalBugs: number
	totalVulnerabilities: number
	totalCodeSmells: number
	averageCoverage: number // 0-100
	passedQualityGate: number
	failedQualityGate: number
	medianBugs: number
	medianVulnerabilities: number
	medianCodeSmells: number
	medianCoverage: number
	medianDuplications: number
	medianLinesOfCode: number
	medianSecurityRating: TRating | null
	medianReliabilityRating: TRating | null
	medianMaintainabilityRating: TRating | null
}

export interface ITechStackAnalysis {
	requestedFilters: string[]
	foundTechStack: string[]
	notFoundTechStack: string[]
	percentageFound: number // 0-100
}

export interface IRepositoryQualityMetrics {
	repositoryName: string
	language: string
	status: TRepositoryScanStatus
	errorMessage: string | null
	metrics: IRepositoryMetrics | null
}

export interface IRepositoryMetrics {
	qualityGateStatus: TQualityGateStatus
	bugs: number
	vulnerabilities: number
	codeSmells: number
	coverage: number // 0-100
	duplications: number // 0-100
	linesOfCode: number
	securityRating: TRating
	reliabilityRating: TRating
	maintainabilityRating: TRating
	techStack: string[]
}
