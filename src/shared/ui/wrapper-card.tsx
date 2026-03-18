import Link from 'next/link'
import { type PropsWithChildren } from 'react'

import { cn } from '@/shared/helpers'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	buttonVariants
} from './kit'

interface IWrapperCardProps {
	title: string
	description?: string
	footerLinkLabel?: string
	footerLinkHref?: string
	className?: string
}

export function WrapperCard({
	children,
	title,
	description,
	footerLinkLabel,
	footerLinkHref,
	className
}: PropsWithChildren<IWrapperCardProps>) {
	return (
		<Card className={cn('w-full max-w-100 shadow-md', className)}>
			<CardHeader className="space-y-2 text-center">
				<CardTitle className="text-xl font-semibold sm:text-2xl">
					{title}
				</CardTitle>
				{description && (
					<CardDescription className="text-sm sm:text-base">
						{description}
					</CardDescription>
				)}
			</CardHeader>
			<CardContent>{children}</CardContent>
			{footerLinkLabel && footerLinkHref && (
				<CardFooter className="flex justify-center">
					<Link
						href={footerLinkHref}
						className={buttonVariants({
							variant: 'link',
							className: 'w-full text-xs sm:text-sm'
						})}
					>
						{footerLinkLabel}
					</Link>
				</CardFooter>
			)}
		</Card>
	)
}
