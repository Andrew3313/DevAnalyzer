'use client'

import { useCallback } from 'react'

import { useIntersection } from '@/shared/hooks'
import { StateMessage } from '@/shared/ui'
import { Spinner } from '@/shared/ui/kit'

import { useFavoriteReports } from '../hooks'
import { FavoriteReportCard } from './favorite-report-card'
import { FavoriteReportCardSkeleton } from './favorite-report-card-skeleton'

const FAVORITE_REPORTS_LIMIT = 4
const SKELETON_COUNT = 2

export function ProfileFavorites() {
	const {
		reports,
		reportsError,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoadingReports
	} = useFavoriteReports(FAVORITE_REPORTS_LIMIT)

	const loadNextPage = useCallback(() => {
		if (hasNextPage && !isFetchingNextPage) {
			fetchNextPage()
		}
	}, [fetchNextPage, hasNextPage, isFetchingNextPage])

	const cursorRef = useIntersection(loadNextPage, {
		threshold: 0.05,
		rootMargin: '240px'
	})

	if (isLoadingReports) {
		return (
			<div className="grid gap-4 xl:grid-cols-2">
				{Array.from({ length: SKELETON_COUNT }).map((_, index) => (
					<FavoriteReportCardSkeleton key={index} />
				))}
			</div>
		)
	}

	if (reportsError) {
		return (
			<StateMessage
				title="Не удалось загрузить избранное"
				description="Попробуйте обновить страницу"
				descriptionClassName="text-sm"
				className="min-h-[50vh]"
			/>
		)
	}

	if (!reports?.length) {
		return (
			<StateMessage
				title="В избранном пока пусто"
				description="Добавляйте отчеты в избранное, чтобы быстро возвращаться к ним"
				descriptionClassName="text-sm"
				className="min-h-[50vh]"
			/>
		)
	}

	return (
		<div className="space-y-6">
			<div className="grid gap-4 xl:grid-cols-2">
				{reports.map((report) => (
					<FavoriteReportCard
						key={report.requestId}
						report={report}
					/>
				))}
			</div>

			<div
				ref={cursorRef}
				className="flex min-h-10 items-center justify-center"
			>
				{isFetchingNextPage && (
					<Spinner className="text-muted-foreground size-5" />
				)}
			</div>
		</div>
	)
}
