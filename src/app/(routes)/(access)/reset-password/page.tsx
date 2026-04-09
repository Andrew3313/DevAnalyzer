import { type Metadata } from 'next'
import { redirect } from 'next/navigation'

import { ResetPasswordForm } from '@/features/reset-password/ui'
import { isTokenValid } from '@/shared/helpers'
import { type TSearchParams } from '@/shared/model'
import { Route } from '@/shared/values'

export const metadata: Metadata = {
	title: 'Сброс пароля | DevAnalyzer'
}

interface IResetPasswordPageProps {
	searchParams: TSearchParams
}

export default async function ResetPasswordPage({
	searchParams
}: IResetPasswordPageProps) {
	const token = [(await searchParams).token].flat()[0]

	if (!token || !isTokenValid(token)) redirect(Route.Home)

	return <ResetPasswordForm token={token} />
}
