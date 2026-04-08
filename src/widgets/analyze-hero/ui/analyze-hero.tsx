import { Zap } from 'lucide-react'

import { AnalyzeForm } from '@/features/analyze-candidate/ui'

export const AnalyzeHero = () => (
	<section className="mx-auto max-w-4xl px-6 py-16 text-center">
		<div className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs text-violet-500 sm:text-sm dark:text-violet-400">
			<Zap className="size-5" />
			<span>Интеграция с GitHub API</span>
		</div>

		<h1 className="mb-2 text-4xl leading-tight font-extrabold md:text-5xl">
			<span>GitHub профиль →</span>
			<br />
			<span className="bg-linear-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
				HR-отчёт
			</span>
		</h1>

		<p className="text-foreground/80 mx-auto mb-8 max-w-2xl text-sm leading-relaxed font-medium">
			Получите детальный аналитический отчёт: активность, качество кода,
			соответствие резюме
		</p>

		<AnalyzeForm />
	</section>
)
