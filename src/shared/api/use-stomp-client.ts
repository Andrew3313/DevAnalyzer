import { Client, IMessage } from '@stomp/stompjs'
import { useState, useRef, useEffect, useCallback } from 'react'
import SockJS from 'sockjs-client'

import { isDev } from '@/shared/helpers'

export type TStompUnsubscribe = (() => void) | null

interface IUseStompClientOptions {
	url: string
	reconnectDelay?: number
	onConnect?: () => void
	onDisconnect?: () => void
	debug?: boolean
}

export function useStompClient({
	url,
	onConnect,
	onDisconnect,
	reconnectDelay = 5000,
	debug = isDev()
}: IUseStompClientOptions) {
	const [connected, setConnected] = useState(false)
	const clientRef = useRef<Client | null>(null)

	useEffect(() => {
		const client = new Client({
			webSocketFactory: () => new SockJS(url),
			reconnectDelay,
			onConnect: () => {
				setConnected(true)
				onConnect?.()
			},
			onDisconnect: () => {
				setConnected(false)
				onDisconnect?.()
			},
			debug: debug ? (str) => console.log('[STOMP]', str) : undefined
		})

		client.activate()
		clientRef.current = client

		return () => {
			client.deactivate()
			clientRef.current = null
		}
	}, [url, reconnectDelay, onConnect, onDisconnect, debug])

	const subscribe = useCallback(
		<T = unknown>(
			destination: string,
			callback: (message: T) => void
		): TStompUnsubscribe => {
			if (!clientRef.current || !connected) {
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

	const send = useCallback(
		(destination: string, body: unknown) => {
			if (!clientRef.current || !connected) {
				console.error('[STOMP] Client not ready, cannot send')
				return
			}

			clientRef.current.publish({
				destination,
				body: JSON.stringify(body)
			})
		},
		[connected]
	)

	return {
		connected,
		subscribe,
		send
	}
}
