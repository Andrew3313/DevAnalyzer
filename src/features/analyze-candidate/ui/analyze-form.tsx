'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { ExpandableInput } from '@/shared/ui'
// import { Field, FieldError, Input } from '@/shared/ui/kit'

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
						dropdownContent={
							<div>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Suscipit deserunt alias
								dolorem facere distinctio voluptatem
								dignissimos, cupiditate obcaecati tempore
								doloremque. Lorem ipsum dolor sit amet
								consectetur adipisicing elit. Suscipit deserunt
								alias dolorem facere distinctio voluptatem
								dignissimos, cupiditate obcaecati tempore
								doloremque.
							</div>
						}
					/>
				)}
			/>
		</form>
	)
}
