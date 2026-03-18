import { RegisterForm } from '@/features/auth/ui'

import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Регистрация | DevAnalyzer'
}

export default function RegisterPage() {
	return <RegisterForm />
}
