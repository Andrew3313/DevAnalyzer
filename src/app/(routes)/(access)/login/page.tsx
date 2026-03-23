import { type Metadata } from 'next'

import { LoginWidget } from '@/widgets/login-widget/ui'

export const metadata: Metadata = {
	title: 'Вход в аккаунт | DevAnalyzer'
}

export default function LoginPage() {
	return <LoginWidget />
}
