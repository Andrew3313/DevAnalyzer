'use client'

import { Toaster } from '@/shared/ui/kit'

export function ToastProvider() {
	return <Toaster position="bottom-right" duration={5000} closeButton />
}
