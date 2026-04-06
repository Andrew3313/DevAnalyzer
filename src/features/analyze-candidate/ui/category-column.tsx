import { cn } from '@/shared/helpers'
import { Button } from '@/shared/ui/kit'

interface ICategoryColumnProps {
	title: string
	options: readonly string[]
	selected: string[]
	onToggle: (value: string) => void
}

export const CategoryColumn = ({
	title,
	options,
	selected,
	onToggle
}: ICategoryColumnProps) => (
	<div className="flex min-w-0 flex-col gap-2.5 overflow-hidden">
		<span className="text-muted-foreground truncate text-sm font-medium">
			{title}
		</span>

		<div className="flex flex-wrap gap-2">
			{options.map((item) => (
				<Button
					type="button"
					variant="ghost"
					key={item}
					onClick={() => onToggle(item)}
					className={cn('whitespace-nowrap transition-all', {
						'bg-violet-500/10 text-violet-400 hover:bg-violet-500/7 hover:text-violet-400/80 dark:hover:bg-violet-500/5':
							selected.includes(item)
					})}
				>
					{item}
				</Button>
			))}
		</div>
	</div>
)
