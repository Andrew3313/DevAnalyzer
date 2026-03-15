import { cn } from '@/shared/helpers'

interface IContainerProps {
	className?: string
}

export function Container({
	className,
	children
}: React.PropsWithChildren<IContainerProps>) {
	return <div className={cn('mx-auto max-w-6xl', className)}>{children}</div>
}
