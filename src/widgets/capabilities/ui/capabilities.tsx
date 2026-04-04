import { BarChart2, Code2, Shield } from 'lucide-react'

import { Card } from '@/shared/ui/kit'

const CAPABILITIES = [
	{
		icon: BarChart2,
		title: 'Активность и вклад',
		description:
			'Анализ коммитов, PR, звёзд и паттернов активности за всё время'
	},
	{
		icon: Code2,
		title: 'Качество кода',
		description:
			'Оценка читаемости, документации, тестового покрытия и архитектуры'
	},
	{
		icon: Shield,
		title: 'Проверка резюме',
		description:
			'Сравниваем заявленные технологии с реальным опытом на GitHub'
	}
]

export const Capabilities = () => (
	<section className="mb-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		{CAPABILITIES.map(({ icon: Icon, title, description }) => (
			<Card key={title} className="gap-4 p-6">
				<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
					<Icon className="size-7 text-violet-400" />
				</div>

				<h3 className="text-lg font-semibold">{title}</h3>
				<p className="text-muted-foreground text-sm leading-relaxed">
					{description}
				</p>
			</Card>
		))}
	</section>
)
