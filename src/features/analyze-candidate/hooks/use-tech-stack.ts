import { useState, useCallback } from 'react'

interface IUseTechStackOptions {
	initialLanguages?: string[]
	initialTechStack?: string[]
}

export function useTechStack(options?: IUseTechStackOptions) {
	const [languages, setLanguages] = useState<string[]>(
		options?.initialLanguages ?? []
	)
	const [techStack, setTechStack] = useState<string[]>(
		options?.initialTechStack ?? []
	)

	const toggleLanguage = useCallback((lang: string) => {
		setLanguages((prev) =>
			prev.includes(lang)
				? prev.filter((l) => l !== lang)
				: [...prev, lang]
		)
	}, [])

	const toggleTech = useCallback((tech: string) => {
		setTechStack((prev) =>
			prev.includes(tech)
				? prev.filter((t) => t !== tech)
				: [...prev, tech]
		)
	}, [])

	const resetAll = useCallback(() => {
		setLanguages([])
		setTechStack([])
	}, [])

	return {
		data: {
			languages,
			techStack
		},
		actions: {
			toggleLanguage,
			toggleTech,
			resetAll
		}
	}
}
