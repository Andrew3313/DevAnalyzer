'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { UserRole } from '@/entities/user/values'
import { cn } from '@/shared/helpers'
import { buttonVariants, Card, CardContent } from '@/shared/ui/kit'

import { getProfileTabs } from '../helpers'

interface IProfileSidebarProps {
	role: UserRole
	className?: string
}

export function ProfileSidebar({ role, className }: IProfileSidebarProps) {
	const pathname = usePathname()

	const allowedTabs = getProfileTabs(role)
	const activeTab =
		allowedTabs.find((tab) => tab.href === pathname)?.href ?? ''

	return (
		<Card className={cn('w-full shrink-0 py-0 sm:w-64', className)}>
			<CardContent className="p-4">
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
					{allowedTabs.map((tab) => (
						<Link
							key={tab.href}
							href={tab.href}
							className={cn(
								buttonVariants({
									variant: 'ghost',
									size: 'lg',
									className: 'sm:justify-start'
								}),
								'animate-underline',
								activeTab === tab.href && 'active'
							)}
						>
							{tab.icon && <tab.icon className="size-5" />}
							<span className="truncate">{tab.label}</span>
						</Link>
					))}
				</div>
			</CardContent>
		</Card>
	)
}
