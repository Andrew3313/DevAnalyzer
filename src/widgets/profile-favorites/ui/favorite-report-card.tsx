import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import {
	CalendarDays,
	CheckCircle2,
	ExternalLink,
	FileText,
	ScanLine
} from 'lucide-react'
import Link from 'next/link'

import { cn, makeDynamicPath } from '@/shared/helpers'
import { Card, CardContent, CardDescription, CardFooter } from '@/shared/ui/kit'
import { Route } from '@/shared/values'

import { type IFavoriteReport } from '../model'

interface IFavoriteReportCardProps {
	report: IFavoriteReport
	className?: string
}

export function FavoriteReportCard({
	report,
	className
}: IFavoriteReportCardProps) {
	const reportHref = makeDynamicPath(Route.Report, { id: report.requestId })
	const createdAt = format(new Date(report.createdAt), 'd MMMM yyyy', {
		locale: ru
	})

	return (
		<Link
			href={reportHref}
			className={cn(
				'group focus-visible:border-ring focus-visible:ring-ring/50 block cursor-pointer rounded-xl border border-transparent focus:outline-none focus-visible:ring-1',
				className
			)}
		>
			<Card className="border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card hover:shadow-primary/5 relative h-full overflow-hidden backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg">
				<div className="from-primary/5 absolute inset-0 bg-linear-to-br via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

				<div className="relative z-10 flex items-start gap-4 px-6">
					<div className="bg-primary/7 text-primary group-hover:text-primary-foreground flex size-14 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 group-hover:bg-violet-400">
						<FileText className="size-7" />
					</div>

					<div className="min-w-0 flex-1 space-y-1.5">
						<div className="flex items-center gap-2">
							<h3 className="text-foreground truncate text-xl font-semibold">
								{report.githubUsername}
							</h3>
							<ExternalLink className="size-4 shrink-0 text-violet-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
						</div>

						<CardDescription className="flex items-center gap-1.5 text-xs">
							<CalendarDays className="size-3.5" />
							{createdAt}
						</CardDescription>
					</div>
				</div>

				<CardContent className="relative z-10 flex items-center justify-center pt-7">
					<ScoreCircle score={report.overallScore} />
				</CardContent>

				<CardFooter className="relative z-10 flex flex-col items-center gap-2 px-6">
					<ReportStat
						icon={ScanLine}
						label="Отсканировано"
						value={report.successfulScans}
					/>
					<ReportStat
						icon={FileText}
						label="Репозитории"
						value={report.totalRepositories}
					/>
					<ReportStat
						icon={CheckCircle2}
						label="Проверено"
						value={report.verifiedRepositories}
					/>
				</CardFooter>
			</Card>
		</Link>
	)
}

interface IScoreCircleProps {
	score: number
}

function ScoreCircle({ score }: IScoreCircleProps) {
	return (
		<div className="border-primary/15 bg-primary/7 flex size-28 flex-col items-center justify-center rounded-full border text-center shadow-inner transition-colors duration-300 group-hover:border-violet-400/40 group-hover:bg-violet-400/10">
			<span className="text-foreground text-4xl leading-none font-bold tabular-nums">
				{score}
			</span>
			<span className="text-muted-foreground mt-1 text-xs font-medium">
				из 100
			</span>
		</div>
	)
}

interface IReportStatProps {
	icon: typeof FileText
	label: string
	value: number
}

function ReportStat({ icon: Icon, label, value }: IReportStatProps) {
	return (
		<div className="bg-secondary/70 flex w-fit items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors duration-300 group-hover:bg-violet-500/10">
			<Icon className="size-4 shrink-0 text-violet-400" />
			<span className="text-muted-foreground">{label}:</span>
			<span className="font-semibold tabular-nums">{value}</span>
		</div>
	)
}
