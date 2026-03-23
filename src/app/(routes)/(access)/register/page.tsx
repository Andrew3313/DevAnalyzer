import { type Metadata } from 'next'

import { RegisterForm } from '@/features/auth/ui'

export const metadata: Metadata = {
	title: 'Регистрация | DevAnalyzer'
}

export default function RegisterPage() {
	return <RegisterForm />
}
