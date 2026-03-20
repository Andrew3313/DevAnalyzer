'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm, type UseFormReturn } from 'react-hook-form'

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

import { useLogin } from '../hooks'
import { LoginSchema, type TLoginSchema } from '../model'
import { LOGIN_FIELDS } from '../values'

const INITIAL_FORM_STATE: TLoginSchema = {
	email: '',
	password: ''
}

interface ILoginFormProps {
	afterFields?:
		| React.ReactNode
		| ((form: UseFormReturn<TLoginSchema>) => React.ReactNode)
}

export function LoginForm({ afterFields }: ILoginFormProps) {
	const form = useForm<TLoginSchema>({
		resolver: zodResolver(LoginSchema),
		mode: 'onTouched',
		defaultValues: INITIAL_FORM_STATE
	})

	const { login, isLoadingLogin } = useLogin()

	const handleSubmit = (values: TLoginSchema) => {
		login(values)
		form.reset()
	}

	return (
		<WrapperCard
			title="С возвращением!"
			description="Войдите в свой аккаунт"
			footerLinkLabel="Нет аккаунта? Зарегистрироваться ->"
			footerLinkHref={Route.Register}
		>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
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
										disabled={isLoadingLogin}
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

					{typeof afterFields === 'function'
						? afterFields(form)
						: afterFields}

					<Field>
						<Button type="submit" disabled={isLoadingLogin}>
							{isLoadingLogin ? 'Вход в аккаунт...' : 'Войти'}
						</Button>
					</Field>
				</FieldGroup>
			</form>
		</WrapperCard>
	)
}
