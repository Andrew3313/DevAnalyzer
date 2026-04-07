import Link from 'next/link'

import { cn } from '@/shared/helpers'
import { buttonVariants } from '@/shared/ui/kit'
import { Route } from '@/shared/values'

interface IStateMessageProps {
	title: string
	subtitle?: string
	description?: string
	linkText?: string
	linkHref?: Route
	className?: string
}

export const StateMessage = ({
	title,
	subtitle,
	description,
	linkText,
	linkHref = Route.Home,
	className
}: IStateMessageProps) => (
	<div
		className={cn(
			'flex flex-col items-center justify-center text-center',
			className
		)}
	>
		<div className="space-y-4">
			<h1 className="text-3xl font-bold">{title}</h1>
			{subtitle && <h2 className="text-2xl font-semibold">{subtitle}</h2>}
			{description && (
				<p className="text-muted-foreground text-xl">{description}</p>
			)}
			{linkText && (
				<Link
					href={linkHref}
					className={buttonVariants({ size: 'lg' })}
				>
					{linkText}
				</Link>
			)}
		</div>
	</div>
)
