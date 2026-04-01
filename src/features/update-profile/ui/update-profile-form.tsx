'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

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

const INITIAL_FORM_STATE: TUpdateProfileSchema = {
	firstName: '',
	lastName: '',
	patronymic: '',
	company: '',
	position: ''
}

interface IUpdateProfileFormProps {
	user: IUser
}

export function UpdateProfileForm({ user }: IUpdateProfileFormProps) {
	const [formData, setFormData] = useState<Partial<TUpdateProfileSchema>>({})
	const [showErrors, setShowErrors] = useState(false)

	const { updateProfile, isUpdatingProfile } = useUpdateProfile()

	const computedFormData = {
		...INITIAL_FORM_STATE,
		...{
			firstName: user.firstName,
			lastName: user.lastName,
			patronymic: user.patronymic,
			company: user.company,
			position: user.position
		},
		...formData
	}

	const validate = () => {
		const res = UpdateProfileSchema.safeParse(computedFormData)
		if (res.success) {
			return undefined
		}

		return z.treeifyError(res.error)
	}

	const filterUserData = (user: IUser) => ({
		firstName: user.firstName,
		lastName: user.lastName,
		patronymic: user.patronymic,
		company: user.company,
		position: user.position
	})

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()

		const validationErrors = validate()

		if (validationErrors) {
			setShowErrors(true)
			toast.message('Проверьте правильность заполнения полей!')
			return
		}

		if (
			JSON.stringify(computedFormData) ===
			JSON.stringify(filterUserData(user))
		) {
			toast.message('Введите новые данные пользователя!')
			return
		}

		updateProfile(computedFormData)
	}

	const visibleFields = UPDATE_PROFILE_FIELDS.filter(
		(field) => !field.showIf || field.showIf(user.role)
	)

	const errors = showErrors ? validate() : undefined

	return (
		<WrapperCard title="Редактирование профиля" className="max-w-full">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col items-center space-y-4"
			>
				<FieldGroup className="grid grid-cols-1 md:grid-cols-2">
					{visibleFields.map((formField) => {
						const errorMessages =
							errors?.properties?.[formField.name]?.errors

						const isInvalid = !!errorMessages?.length
						const fieldError = errorMessages?.map((message) => ({
							message
						}))

						return (
							<Field
								key={formField.name}
								data-invalid={isInvalid}
							>
								<FieldLabel htmlFor={formField.name}>
									{formField.label}
								</FieldLabel>

								<Input
									id={formField.name}
									name={formField.name}
									type={formField.type}
									value={computedFormData[formField.name]}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											[formField.name]: e.target.value
										}))
									}
									disabled={isUpdatingProfile}
									aria-invalid={isInvalid}
								/>
								{isInvalid && (
									<FieldError errors={fieldError} />
								)}
							</Field>
						)
					})}

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
