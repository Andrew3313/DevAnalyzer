import { type Metadata } from 'next'
import { redirect } from 'next/navigation'

import { ResetPasswordForm } from '@/features/reset-password/ui'
import { isTokenValid } from '@/shared/helpers'
import { Route } from '@/shared/values'

export const metadata: Metadata = {
	title: 'Сброс пароля | DevAnalyzer'
}

interface IResetPasswordPageProps {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ResetPasswordPage({
	searchParams
}: IResetPasswordPageProps) {
	const tokenRaw = (await searchParams).token

	const token = Array.isArray(tokenRaw) ? tokenRaw[0] : tokenRaw
	if (!token || !isTokenValid(token)) {
		redirect(Route.Home)
	}

	return <ResetPasswordForm token={token} />
}
