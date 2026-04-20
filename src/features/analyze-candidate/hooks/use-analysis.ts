import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef, useCallback } from 'react'
import { toast } from 'sonner'

import { useStompClient, type TStompUnsubscribe } from '@/shared/api'
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

	const { connected, subscribe } = useStompClient({
		url: ANALYSIS_WS_URL,
		enabled
	})

	const [status, setStatus] = useState<AnalysisStatus | null>(null)
	const isAnalysisRunning =
		!!status &&
		status !== AnalysisStatus.COMPLETED &&
		status !== AnalysisStatus.FAILED

	const requestIdRef = useRef<string | null>(null)
	const unsubscribeRef = useRef<TStompUnsubscribe>(null)

	const { mutate: runAnalysis, isPending: isLoadingAnalysis } = useMutation({
		mutationKey: ['analysis'],
		mutationFn: (values: IStartAnalysisRequest) => startAnalysis(values),
		onSuccess: (data) => {
			requestIdRef.current = data.requestId
			setStatus(AnalysisStatus.PROCESSING)
		},
		onError: (error) => {
			console.error('Analysis start failed:', error)

			setStatus(AnalysisStatus.FAILED)
			requestIdRef.current = null

			toast.error(
				'Не удалось запустить анализ. Возможно, вы не указали стек технологий'
			)
		}
	})

	const startAnalysisWithGuard = (payload: IStartAnalysisRequest) => {
		if (!connected) {
			toast.error(
				'Нет соединения с сервером. Попробуйте обновить страницу'
			)
			return
		}

		runAnalysis(payload)
	}

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

	useEffect(() => {
		if (!connected) return

		unsubscribeRef.current = subscribe<IAnalysisWSMessage>(
			'/user/queue/analysis-status',
			handleMessage
		)

		return () => {
			unsubscribeRef.current?.()
			unsubscribeRef.current = null
			requestIdRef.current = null
		}
	}, [connected, subscribe, handleMessage])

	return {
		runAnalysis: startAnalysisWithGuard,
		status,
		isLoadingAnalysis,
		isAnalysisRunning
	}
}
