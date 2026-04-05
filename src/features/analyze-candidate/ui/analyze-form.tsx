'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'

import { ExpandableInput } from '@/shared/ui'
import { Button } from '@/shared/ui/kit'

import { AnalyzeCandidateSchema, type TAnalyzeCandidateSchema } from '../model'

const INITIAL_FORM_STATE: TAnalyzeCandidateSchema = {
	candidateRef: ''
}

export function AnalyzeForm() {
	const form = useForm<TAnalyzeCandidateSchema>({
		resolver: zodResolver(AnalyzeCandidateSchema),
		mode: 'onChange',
		defaultValues: INITIAL_FORM_STATE
	})

	const handleSubmit = (values: TAnalyzeCandidateSchema) => {
		console.log(values)
	}

	return (
		<form onSubmit={form.handleSubmit(handleSubmit)}>
			<Controller
				name="candidateRef"
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
						rightInputSlotClassName="bottom-0 right-1 flex items-center justify-center"
						rightInputSlot={
							<Button
								type="submit"
								className="h-10.5 gap-1.5 px-4.5 sm:px-2.5"
							>
								<Search className="size-5" />
								<span className="hidden sm:inline">
									Анализировать
								</span>
							</Button>
						}
					/>
				)}
			/>
		</form>
	)
}
