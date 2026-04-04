'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface IUseWebSocketOptions<TMessage, TSend> {
	url?: string
	parse?: (data: string) => TMessage
	serialize?: (data: TSend) => string
	onMessage?: (message: TMessage) => void
	onOpen?: () => void
	onClose?: () => void
	onError?: (event: Event) => void
}

export function useWebSocket<TMessage = unknown, TSend = unknown>(
	options: IUseWebSocketOptions<TMessage, TSend>
) {
	const {
		url,
		parse = JSON.parse,
		serialize = JSON.stringify,
		onMessage,
		onOpen,
		onClose,
		onError
	} = options

	const socketRef = useRef<WebSocket | null>(null)

	const [lastMessage, setLastMessage] = useState<TMessage | null>(null)
	const [isConnected, setIsConnected] = useState(false)
	const [readyState, setReadyState] = useState<number>(WebSocket.CONNECTING)

	useEffect(() => {
		if (!url) return

		const socket = new WebSocket(url)
		socketRef.current = socket

		socket.onopen = () => {
			setIsConnected(true)
			setReadyState(socket.readyState)

			onOpen?.()
		}

		socket.onmessage = (event) => {
			const parsed = parse(event.data)
			setLastMessage(parsed)

			onMessage?.(parsed)
		}

		socket.onclose = () => {
			setIsConnected(false)
			setReadyState(WebSocket.CLOSED)

			onClose?.()
		}

		socket.onerror = (event) => {
			setReadyState(socket.readyState)

			onError?.(event)
		}

		return () => {
			socket.close()
			socketRef.current = null
		}
	}, [url, parse, onMessage, onOpen, onClose, onError])

	const send = useCallback(
		(payload: TSend) => {
			const socket = socketRef.current
			if (socket?.readyState === WebSocket.OPEN) {
				socket.send(serialize(payload))
			}
		},
		[serialize]
	)

	const disconnect = useCallback(() => {
		socketRef.current?.close()
	}, [])

	return { lastMessage, readyState, isConnected, send, disconnect }
}
