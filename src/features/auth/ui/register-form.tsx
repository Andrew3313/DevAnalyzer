'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm, useWatch } from 'react-hook-form'

import { UserRole } from '@/entities/user/values'
import { PasswordFieldsGroup, WrapperCard } from '@/shared/ui'
import {
	Button,
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/shared/ui/kit'
import { Route } from '@/shared/values'

import { useRegister } from '../hooks'
import { RegisterSchema, type TRegisterSchema } from '../model'
import { REGISTER_FIELDS } from '../values'

const INITIAL_FORM_STATE: TRegisterSchema = {
	firstName: '',
	lastName: '',
	patronymic: '',
	company: '',
	position: '',
	email: '',
	password: '',
	confirmPassword: ''
}

export function RegisterForm() {
	const form = useForm<TRegisterSchema>({
		resolver: zodResolver(RegisterSchema),
		mode: 'onTouched',
		defaultValues: INITIAL_FORM_STATE
	})

	const role = useWatch({
		control: form.control,
		name: 'role'
	})

	const { register, isLoadingRegister } = useRegister({
		onSuccess: () => {
			form.reset()
		}
	})

	const handleSubmit = (values: TRegisterSchema) => register(values)

	const visibleFields = REGISTER_FIELDS.filter(
		(field) => !field.showIf || (role && field.showIf(role))
	)

	return (
		<WrapperCard
			title="Создать аккаунт"
			description="Зарегистрируйтесь как рекрутер и получите доступ к сравнению кандидатов, избранному и истории отчётов"
			footerLinkLabel="Уже есть аккаунт? Войти ->"
			footerLinkHref={Route.Login}
			className="max-w-xl"
		>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<FieldGroup className="grid grid-cols-1 sm:grid-cols-2">
					<Controller
						name="role"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field className="col-span-1 sm:col-span-2">
								<FieldLabel htmlFor={field.name}>
									Тип аккаунта
								</FieldLabel>

								<Select
									value={field.value ?? ''}
									onValueChange={field.onChange}
									disabled={isLoadingRegister}
								>
									<SelectTrigger id={field.name}>
										<SelectValue placeholder="Выберите роль" />
									</SelectTrigger>

									<SelectContent position="popper">
										<SelectItem value={UserRole.USER}>
											Пользователь
										</SelectItem>
										<SelectItem value={UserRole.HR}>
											Рекрутер
										</SelectItem>
									</SelectContent>
								</Select>
								{fieldState.invalid && (
									<FieldError>
										{fieldState.error?.message}
									</FieldError>
								)}
							</Field>
						)}
					/>

					{visibleFields.map((formField) => (
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
										disabled={isLoadingRegister}
									/>
									{fieldState.invalid && (
										<FieldError>
											{fieldState.error?.message}
										</FieldError>
									)}
								</Field>
							)}
						/>
					))}

					<PasswordFieldsGroup
						control={form.control}
						disabled={isLoadingRegister}
					/>

					<Field className="col-span-1 sm:col-span-2">
						<Button
							type="submit"
							className="w-full"
							disabled={isLoadingRegister}
						>
							Зарегистрироваться
						</Button>
					</Field>
				</FieldGroup>
			</form>
		</WrapperCard>
	)
}
