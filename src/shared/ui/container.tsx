import { cn } from '@/shared/helpers'

interface IContainerProps {
	className?: string
}

export function Container({
	className,
	children
}: React.PropsWithChildren<IContainerProps>) {
	return (
		<div className={cn('mx-auto max-w-6xl px-4', className)}>
			{children}
		</div>
	)
}
