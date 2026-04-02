import { type Metadata } from 'next'

import { UpdatePasswordForm } from '@/features/update-profile/ui'

export const metadata: Metadata = {
	title: 'Безопасность'
}

export default function ProfileSecurityPage() {
	return <UpdatePasswordForm />
}
