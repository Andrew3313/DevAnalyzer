import Link, { type LinkProps } from 'next/link'

import { cn } from '@/shared/helpers'
import { buttonVariants } from '@/shared/ui/kit'

interface ILinkButtonProps extends LinkProps {
	children: React.ReactNode
	className?: string
}

export const LinkButton = ({
	children,
	className,
	...props
}: ILinkButtonProps) => (
	<Link
		{...props}
		className={cn(
			buttonVariants({ variant: 'ghost', size: 'lg' }),
			className
		)}
	>
		{children}
	</Link>
)
