'use client'

import { LoginForm } from '@/features/auth/ui'
import { Field } from '@/shared/ui/kit'

import { ForgotWrapper } from './forgot-wrapper'

export function LoginWidget() {
	return (
		<LoginForm
			afterFields={(form, isLoading) => (
				<Field>
					<ForgotWrapper form={form} isLoading={isLoading} />
				</Field>
			)}
		/>
	)
}
