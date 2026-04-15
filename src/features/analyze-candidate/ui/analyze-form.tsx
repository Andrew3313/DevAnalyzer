'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { getUserAccessFlags } from '@/entities/user/helpers'
import { type IUser } from '@/entities/user/model'
import { makeDynamicPath } from '@/shared/helpers'
import { ExpandableInput } from '@/shared/ui'
import { Button } from '@/shared/ui/kit'
import { Route } from '@/shared/values'

import { extractGitHubUsername } from '../helpers'
import { useTechStack } from '../hooks'
import { AnalyzeCandidateSchema, type TAnalyzeCandidateSchema } from '../model'
import { AnalysisStatusBadge } from './analysis-status-badge'
import { TechStackSelector } from './tech-stack-selector'
import { AnalysisStatus } from '../values'

const INITIAL_FORM_STATE: TAnalyzeCandidateSchema = {
	candidateLink: ''
}

interface IAnalyzeFormProps {
	user: IUser | null
}

export function AnalyzeForm({ user }: IAnalyzeFormProps) {
	const { isAuthenticated, isRegularUser, hasExtendedAccess } =
		getUserAccessFlags(user)

	const router = useRouter()
	const { data, actions } = useTechStack()

	const form = useForm<TAnalyzeCandidateSchema>({
		resolver: zodResolver(AnalyzeCandidateSchema),
		mode: 'onChange',
		defaultValues: INITIAL_FORM_STATE
	})

	const handleSubmit = (values: TAnalyzeCandidateSchema) => {
		const username = extractGitHubUsername(values.candidateLink)
		if (!username) {
			toast.error('Проверьте корректность введенных данных')
			return
		}

		if (!isAuthenticated) {
			router.push(Route.Login)
			return
		}

		if (isRegularUser) {
			router.push(makeDynamicPath(Route.Report, { id: username }))
			return
		}

		console.log({
			techStack: data.techStack,
			languages: data.languages,
			githubUsername: username
		})
	}

	return (
		<form onSubmit={form.handleSubmit(handleSubmit)}>
			<Controller
				name="candidateLink"
				control={form.control}
				render={({ field, fieldState }) => (
					<ExpandableInput
						{...field}
						id={field.name}
						aria-invalid={fieldState.invalid}
						errorMessage={fieldState.error?.message}
						type="text"
						placeholder="Ссылка на GitHub"
						className="pr-17 sm:pr-44"
						containerClassName="mx-auto"
						leftInputSlotClassName="top-auto bottom-[calc(100%+var(--spacing))]"
						rightInputSlotClassName="bottom-0 right-1 flex items-center justify-center"
						dropdownContentClassName="max-h-60"
						leftInputSlot={
							hasExtendedAccess ? (
								<AnalysisStatusBadge
									status={AnalysisStatus.PROCESSING}
									className="rounded-md"
								/>
							) : undefined
						}
						rightInputSlot={
							<Button
								type="submit"
								className="h-10.5 gap-1.5 px-4.5 sm:px-2.5"
								disabled={fieldState.invalid}
							>
								<Search className="size-5" />
								<span className="hidden sm:inline">
									Анализировать
								</span>
							</Button>
						}
						dropdownContent={
							hasExtendedAccess ? (
								<TechStackSelector
									languages={data.languages}
									techStack={data.techStack}
									onToggleLanguage={actions.toggleLanguage}
									onToggleTech={actions.toggleTech}
									onReset={actions.resetAll}
								/>
							) : undefined
						}
					/>
				)}
			/>
		</form>
	)
}
