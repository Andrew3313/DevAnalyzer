import { type Metadata } from 'next'

import { Login } from '@/widgets/login/ui'

export const metadata: Metadata = {
	title: 'Вход в аккаунт | DevAnalyzer'
}

export default function LoginPage() {
	return <Login />
}
