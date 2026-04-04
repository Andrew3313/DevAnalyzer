import { Zap } from 'lucide-react'

export const AnalyzeHero = () => (
	<section className="mx-auto max-w-4xl px-6 py-16 text-center">
		<div className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs text-indigo-600 sm:text-sm dark:text-violet-400">
			<Zap className="size-5" />
			<span>Реальная интеграция с GitHub API</span>
		</div>

		<h1 className="mb-2 text-5xl leading-tight font-extrabold">
			<span>GitHub профиль →</span>
			<br />
			<span className="bg-linear-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
				HR-отчёт
			</span>
		</h1>

		<p className="text-foreground/80 mx-auto mb-12 max-w-2xl text-sm leading-relaxed font-medium">
			Получите детальный аналитический отчёт: активность, качество кода,
			соответствие резюме
		</p>
	</section>
)
