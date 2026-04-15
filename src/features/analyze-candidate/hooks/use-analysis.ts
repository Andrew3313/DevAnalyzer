import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef, useCallback } from 'react'
import { toast } from 'sonner'

import { type TStompUnsubscribe, useStompClient } from '@/shared/api'
import { makeDynamicPath } from '@/shared/helpers'
import { Route } from '@/shared/values'

import { startAnalysis } from '../api'
import { AnalysisStatus } from '../values'

import type { IStartAnalysisRequest, IAnalysisWSMessage } from '../model'

const ANALYSIS_WS_URL =
	process.env.NEXT_PUBLIC_ANALYSIS_WS_URL ||
	'http://localhost:8080/dev-analyzer'

export function useAnalysis(enabled: boolean) {
	const router = useRouter()

	const [status, setStatus] = useState<AnalysisStatus | null>(null)

	const requestIdRef = useRef<string | null>(null)
	const unsubscribeRef = useRef<TStompUnsubscribe>(null)

	const { connected, subscribe } = useStompClient({
		url: ANALYSIS_WS_URL,
		enabled
	})

	const { mutate: runAnalysis, isPending: isLoadingAnalysis } = useMutation({
		mutationKey: ['analysis'],
		mutationFn: startAnalysis,
		onSuccess: (data) => {
			requestIdRef.current = data.requestId
			setStatus(AnalysisStatus.PROCESSING)
		},
		onError: (error) => {
			console.error('Analysis start failed:', error)

			setStatus(AnalysisStatus.FAILED)
			requestIdRef.current = null

			toast.error('Не удалось запустить анализ')
		}
	})

	const startAnalysisWithGuard = (payload: IStartAnalysisRequest) => {
		if (!connected) {
			toast.error('Нет соединения с сервером')
			return
		}

		runAnalysis(payload)
	}

	const isAnalysisRunning =
		!!status &&
		status !== AnalysisStatus.COMPLETED &&
		status !== AnalysisStatus.FAILED

	const handleMessage = useCallback(
		(message: IAnalysisWSMessage) => {
			if (message.requestId !== requestIdRef.current) return

			switch (message.status) {
				case AnalysisStatus.PROCESSING:
				case AnalysisStatus.FILTERING:
				case AnalysisStatus.ANALYZING:
				case AnalysisStatus.BUILDING_REPORT:
					setStatus(message.status)
					break

				case AnalysisStatus.COMPLETED:
					setStatus(AnalysisStatus.COMPLETED)
					requestIdRef.current = null

					router.push(
						makeDynamicPath(Route.Report, {
							id: message.requestId
						})
					)
					break

				case AnalysisStatus.FAILED:
					setStatus(AnalysisStatus.FAILED)
					requestIdRef.current = null

					toast.error('Анализ завершился с ошибкой')
					break
			}
		},
		[router]
	)

	const cleanup = useCallback(() => {
		unsubscribeRef.current?.()
		unsubscribeRef.current = null
		requestIdRef.current = null
	}, [])

	useEffect(() => {
		if (!connected) return

		unsubscribeRef.current = subscribe<IAnalysisWSMessage>(
			'/user/queue/analysis-status',
			handleMessage
		)

		return cleanup
	}, [connected, subscribe, handleMessage, cleanup])

	return {
		runAnalysis: startAnalysisWithGuard,
		status,
		isLoadingAnalysis,
		isAnalysisRunning
	}
}
