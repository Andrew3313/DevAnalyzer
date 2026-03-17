import { LoginForm } from '@/features/auth/ui'

import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Вход в аккаунт | DevAnalyzer'
}

export default function LoginPage() {
	return <LoginForm />
}
