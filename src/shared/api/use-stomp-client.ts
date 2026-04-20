'use client'

import { Client, IFrame, IMessage } from '@stomp/stompjs'
import { useState, useRef, useEffect, useCallback } from 'react'
import SockJS from 'sockjs-client'

import { isDev } from '@/shared/helpers'

const DEFAULT_DEBUG = isDev()

export type TStompUnsubscribe = (() => void) | null

interface IUseStompClientOptions {
	url: string
	enabled?: boolean
	reconnectDelay?: number
	heartbeatIncoming?: number
	heartbeatOutgoing?: number
	onConnect?: () => void
	onDisconnect?: () => void
	debug?: boolean
}

export function useStompClient({
	url,
	onConnect,
	onDisconnect,
	enabled = true,
	reconnectDelay = 5000,
	heartbeatIncoming = 10000,
	heartbeatOutgoing = 10000,
	debug = DEFAULT_DEBUG
}: IUseStompClientOptions) {
	const [connected, setConnected] = useState(false)
	const clientRef = useRef<Client | null>(null)

	const subscribe = useCallback(
		<T = unknown>(
			destination: string,
			callback: (message: T) => void
		): TStompUnsubscribe => {
			if (!connected || !clientRef.current) {
				console.error('[STOMP] Client not ready, cannot subscribe')
				return null
			}

			const subscription = clientRef.current.subscribe(
				destination,
				(message: IMessage) => {
					try {
						const parsed = JSON.parse(message.body) as T
						callback(parsed)
					} catch (error) {
						console.error(
							'[STOMP] Failed to parse message body',
							error
						)
					}
				}
			)

			return () => subscription.unsubscribe()
		},
		[connected]
	)

	useEffect(() => {
		if (!enabled) return

		const client = new Client({
			webSocketFactory: () => new SockJS(url),
			reconnectDelay,
			heartbeatIncoming,
			heartbeatOutgoing,
			onConnect: () => {
				setConnected(true)
				onConnect?.()
			},
			onDisconnect: () => {
				setConnected(false)
				onDisconnect?.()
			},
			onStompError: (frame: IFrame) => {
				console.error('[STOMP] STOMP error:', frame)
				setConnected(false)
			},
			onWebSocketError: (event: Event) => {
				console.error('[STOMP] WebSocket error:', event)
				setConnected(false)
			},
			onWebSocketClose: (event: CloseEvent) => {
				console.log(
					'[STOMP] WebSocket closed:',
					event.code,
					event.reason
				)
				setConnected(false)
			},
			debug: debug ? (str) => console.log('[STOMP]', str) : () => {}
		})

		client.activate()
		clientRef.current = client

		return () => {
			if (clientRef.current) {
				clientRef.current.deactivate()
				clientRef.current = null
			}
		}
	}, [
		url,
		reconnectDelay,
		onConnect,
		onDisconnect,
		debug,
		enabled,
		heartbeatIncoming,
		heartbeatOutgoing
	])

	return {
		connected,
		subscribe
	}
}
