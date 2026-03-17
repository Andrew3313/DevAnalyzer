import Link from 'next/link'
import { type PropsWithChildren } from 'react'

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
}

export function WrapperCard({
	children,
	title,
	description,
	footerLinkLabel,
	footerLinkHref
}: PropsWithChildren<IWrapperCardProps>) {
	return (
		<Card className="w-full max-w-100 shadow-md">
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
