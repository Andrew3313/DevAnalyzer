'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { type IUser } from '@/entities/user/model'
import { WrapperCard } from '@/shared/ui'
import {
	Button,
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	Input
} from '@/shared/ui/kit'

import { useUpdateProfile } from '../hooks'
import { UpdateProfileSchema, type TUpdateProfileSchema } from '../model'
import { UPDATE_PROFILE_FIELDS } from '../values'

const mapUserToFormData = (user: IUser): TUpdateProfileSchema => ({
	firstName: user.firstName,
	lastName: user.lastName,
	patronymic: user.patronymic,
	company: user.company ?? undefined,
	position: user.position ?? undefined
})

interface IUpdateProfileFormProps {
	user: IUser
}

export function UpdateProfileForm({ user }: IUpdateProfileFormProps) {
	const form = useForm<TUpdateProfileSchema>({
		resolver: zodResolver(UpdateProfileSchema),
		mode: 'onTouched',
		defaultValues: mapUserToFormData(user)
	})

	const { updateProfile, isUpdatingProfile } = useUpdateProfile()

	const handleSubmit = (values: TUpdateProfileSchema) => {
		if (
			JSON.stringify(values) === JSON.stringify(mapUserToFormData(user))
		) {
			toast.message('Введите новые данные пользователя!', {
				position: 'bottom-center'
			})
			return
		}

		updateProfile(values)
	}

	const visibleFields = UPDATE_PROFILE_FIELDS.filter(
		(field) => !field.showIf || field.showIf(user.role)
	)

	return (
		<WrapperCard title="Редактирование профиля" className="max-w-full">
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="flex flex-col items-center space-y-4"
			>
				<FieldGroup className="grid grid-cols-1 md:grid-cols-2">
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
										disabled={isUpdatingProfile}
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

					<div className="col-span-1 flex justify-center md:col-span-2 md:justify-end">
						<Button type="submit" disabled={isUpdatingProfile}>
							Сохранить изменения
						</Button>
					</div>
				</FieldGroup>
			</form>
		</WrapperCard>
	)
}
