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

export function LoginForm() {
	const form = useForm<TLoginSchema>({
		resolver: zodResolver(LoginSchema),
		mode: 'onBlur',
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const onSubmit = (values: TLoginSchema) => {
		console.log(values)
		form.reset()
	}

	return (
		<div className="flex min-h-[80vh] items-center justify-center px-2">
			<WrapperCard
				title="С возвращением!"
				description="Войдите в свой аккаунт"
				footerLinkLabel="Нет аккаунта? Зарегистрироваться ->"
				footerLinkHref={Route.Register}
			>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-4"
				>
					<FieldGroup>
						<Controller
							name="email"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor={field.name}>
										Email
									</FieldLabel>
									<Input
										{...field}
										id={field.name}
										aria-invalid={fieldState.invalid}
										type="email"
										placeholder="ivan@example.com"
									/>
									{fieldState.invalid && (
										<FieldError
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							)}
						/>

						<Controller
							name="password"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor={field.name}>
										Пароль
									</FieldLabel>
									<Input
										{...field}
										id={field.name}
										aria-invalid={fieldState.invalid}
										placeholder="********"
										type="password"
									/>
									{fieldState.invalid && (
										<FieldError
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							)}
						/>

						<Field>
							<Button type="submit">Войти</Button>
						</Field>
					</FieldGroup>
				</form>
			</WrapperCard>
		</div>
	)
}
