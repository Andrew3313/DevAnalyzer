'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { WrapperCard } from '@/shared/ui'
import {
	Button,
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	Input
} from '@/shared/ui/kit'
import { Route } from '@/shared/values'

import { LoginSchema, type TLoginSchema } from '../model'
import { LOGIN_FIELDS } from '../values'

const INITIAL_FORM_STATE: TLoginSchema = {
	email: '',
	password: ''
}

export function LoginForm() {
	const form = useForm<TLoginSchema>({
		resolver: zodResolver(LoginSchema),
		mode: 'onTouched',
		defaultValues: INITIAL_FORM_STATE
	})

	const onSubmit = (values: TLoginSchema) => {
		console.log(values)
		form.reset()
	}

	return (
		<WrapperCard
			title="С возвращением!"
			description="Войдите в свой аккаунт"
			footerLinkLabel="Нет аккаунта? Зарегистрироваться ->"
			footerLinkHref={Route.Register}
		>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FieldGroup>
					{LOGIN_FIELDS.map((formField) => (
						<Controller
							key={formField.name}
							name={formField.name}
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor={field.name}>
										{formField.label}
									</FieldLabel>
									<Input
										{...field}
										id={field.name}
										aria-invalid={fieldState.invalid}
										type={formField.type}
										placeholder={formField.placeholder}
									/>
									{fieldState.invalid && (
										<FieldError
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							)}
						/>
					))}

					<Field>
						<Button type="submit">Войти</Button>
					</Field>
				</FieldGroup>
			</form>
		</WrapperCard>
	)
}
