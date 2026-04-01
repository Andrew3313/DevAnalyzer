'use client'

import Link from 'next/link'

import { type IUser } from '@/entities/user/model'
import { cn } from '@/shared/helpers'
import { buttonVariants, Card, CardContent } from '@/shared/ui/kit'

import { useProfileLinks } from '../hooks'

interface IProfileSidebarSlots {
	top?: React.ReactNode
	bottom?: React.ReactNode
}

interface IProfileSidebarProps {
	user: IUser
	slots?: IProfileSidebarSlots
	className?: string
}

export function ProfileSidebar({
	user,
	slots,
	className
}: IProfileSidebarProps) {
	const { allowedLinks, activeLink } = useProfileLinks(user.role)

	return (
		<Card className={cn('w-full shrink-0 py-0 sm:w-64', className)}>
			<CardContent className="p-4">
				{slots?.top && <div className="mb-4">{slots.top}</div>}

				<div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
					{allowedLinks.map((tab) => (
						<Link
							key={tab.href}
							href={tab.href}
							className={cn(
								'animate-underline',
								buttonVariants({
									variant: 'ghost',
									size: 'lg',
									className: 'sm:justify-start'
								}),
								{
									active: activeLink === tab.href
								}
							)}
						>
							{tab.icon && <tab.icon className="size-5" />}
							<span className="truncate">{tab.label}</span>
						</Link>
					))}
				</div>

				{slots?.bottom && <div className="mt-4">{slots.bottom}</div>}
			</CardContent>
		</Card>
	)
}
