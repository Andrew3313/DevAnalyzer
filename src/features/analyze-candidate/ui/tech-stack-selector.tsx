'use client'

import { Layers, X } from 'lucide-react'

import { Button, Separator } from '@/shared/ui/kit'

import { MOCK_TECHNOLOGIES } from '../values'
import { CategoryColumn } from './category-column'

interface ITechStackSelectorProps {
	languages: string[]
	techStack: string[]
	onToggleLanguage: (value: string) => void
	onToggleTech: (value: string) => void
	onReset: () => void
}

export const TechStackSelector = ({
	languages,
	techStack,
	onToggleLanguage,
	onToggleTech,
	onReset
}: ITechStackSelectorProps) => (
	<>
		<div className="mb-2.5 flex items-center justify-center gap-2.5 text-violet-400">
			<div className="flex items-center gap-2">
				<Layers className="size-5" />
				<span className="text-sm font-semibold">Стек из резюме</span>
			</div>

			<Button
				type="button"
				variant="ghost"
				size="icon"
				className="hover:text-violet-400/80"
				onClick={onReset}
				disabled={!languages.length && !techStack.length}
			>
				<X className="size-5" />
			</Button>
		</div>

		<div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-2.5 pb-2.5">
			<CategoryColumn
				title="Языки"
				options={MOCK_TECHNOLOGIES.languages}
				selected={languages}
				onToggle={onToggleLanguage}
			/>

			<Separator orientation="vertical" />

			<CategoryColumn
				title="Технологии"
				options={MOCK_TECHNOLOGIES.techStack}
				selected={techStack}
				onToggle={onToggleTech}
			/>
		</div>
	</>
)
