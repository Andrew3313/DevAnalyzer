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
	titleClassName?: string
	subtitleClassName?: string
	descriptionClassName?: string
	linkClassName?: string
}

export const StateMessage = ({
	title,
	subtitle,
	description,
	linkText,
	linkHref = Route.Home,
	className,
	titleClassName,
	subtitleClassName,
	descriptionClassName,
	linkClassName
}: IStateMessageProps) => (
	<div
		className={cn(
			'flex flex-col items-center justify-center text-center',
			className
		)}
	>
		<div className="space-y-4">
			<h1 className={cn('text-3xl font-bold', titleClassName)}>
				{title}
			</h1>
			{subtitle && (
				<h2 className={cn('text-2xl font-semibold', subtitleClassName)}>
					{subtitle}
				</h2>
			)}
			{description && (
				<p
					className={cn(
						'text-muted-foreground text-xl',
						descriptionClassName
					)}
				>
					{description}
				</p>
			)}
			{linkText && (
				<Link
					href={linkHref}
					className={cn(
						buttonVariants({ size: 'lg' }),
						linkClassName
					)}
				>
					{linkText}
				</Link>
			)}
		</div>
	</div>
)
