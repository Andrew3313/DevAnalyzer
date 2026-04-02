'use client'

import { Button } from '@/shared/ui/kit'

import { useLogout } from '../hooks'

interface ILogoutButtonProps {
	className?: string
	children?: React.ReactNode
}

export function LogoutButton({
	children = 'Выйти из аккаунта',
	className
}: ILogoutButtonProps) {
	const { logout, isLoggingOut } = useLogout()

	const handleLogout = () => logout()

	return (
		<Button
			variant="destructive"
			className={className}
			onClick={handleLogout}
			disabled={isLoggingOut}
		>
			{children}
		</Button>
	)
}
