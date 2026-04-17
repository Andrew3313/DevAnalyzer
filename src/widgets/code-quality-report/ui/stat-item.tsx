import { type LucideIcon } from 'lucide-react'

import { cn } from '@/shared/helpers'

interface IStatItemProps {
	icon: LucideIcon
	label?: string
	value: number
	sublabel?: string
	className?: string
}

export const StatItem = ({
	icon: Icon,
	value,
	label,
	sublabel,
	className
}: IStatItemProps) => (
	<div
		className={cn(
			'flex flex-col items-center gap-2 text-center',
			className
		)}
	>
		<Icon className="size-5 text-violet-400" />

		<span className="max-w-full truncate text-2xl font-semibold tabular-nums">
			{value}
		</span>

		{label && <span className="text-xs font-medium">{label}</span>}
		{sublabel && (
			<span className="text-muted-foreground text-xs">{sublabel}</span>
		)}
	</div>
)
