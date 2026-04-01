import { z } from 'zod'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB
const AcceptedImageTypes = z.enum([
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/webp'
])

const ImageFileSchema = z
	.instanceof(File)
	.refine(
		(file) => file.size <= MAX_FILE_SIZE,
		`Размер файла не должен превышать ${MAX_FILE_SIZE / (1024 * 1024)} МБ`
	)
	.refine(
		(file) => AcceptedImageTypes.safeParse(file.type).success,
		'Поддерживаются только JPEG, PNG, WEBP'
	)

export type TValidateImageFileResult =
	| { success: true }
	| { success: false; message: string }

export function validateImageFile(image: File): TValidateImageFileResult {
	const result = ImageFileSchema.safeParse(image)
	if (result.success) return { success: true }

	return {
		success: false,
		message: result.error.issues[0]?.message ?? 'Некорректный файл'
	}
}
