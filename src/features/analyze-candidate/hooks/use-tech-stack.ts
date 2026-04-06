import { useState, useCallback } from 'react'

interface IUseTechStackOptions {
	initialLanguages?: string[]
	initialTechStack?: string[]
}

export function useTechStack({
	initialLanguages = [],
	initialTechStack = []
}: IUseTechStackOptions) {
	const [languages, setLanguages] = useState<string[]>(initialLanguages)
	const [techStack, setTechStack] = useState<string[]>(initialTechStack)

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

	const addLanguage = useCallback((lang: string) => {
		setLanguages((prev) => (prev.includes(lang) ? prev : [...prev, lang]))
	}, [])

	const addTech = useCallback((tech: string) => {
		setTechStack((prev) => (prev.includes(tech) ? prev : [...prev, tech]))
	}, [])

	const setLanguagesBatch = useCallback((newLanguages: string[]) => {
		setLanguages(newLanguages)
	}, [])

	const setTechStackBatch = useCallback((newTechStack: string[]) => {
		setTechStack(newTechStack)
	}, [])

	const resetAll = useCallback(() => {
		setLanguages([])
		setTechStack([])
	}, [])

	return {
		languages,
		toggleLanguage,
		addLanguage,
		techStack,
		toggleTech,
		addTech,
		setLanguagesBatch,
		setTechStackBatch,
		resetAll
	}
}
