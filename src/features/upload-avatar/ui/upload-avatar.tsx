'use client'

import { Pencil } from 'lucide-react'
import { toast } from 'sonner'

import { IUserAvatarProps, UserAvatar } from '@/entities/user/ui'
import { cn, validateImageFile } from '@/shared/helpers'
import { Input } from '@/shared/ui/kit'

import { useUploadAvatar } from '../hooks'

interface IUploadAvatarProps extends IUserAvatarProps {
	avatarClassName?: string
}

export function UploadAvatar({
	src,
	fallback,
	className,
	imageClassName,
	fallbackClassName,
	avatarClassName
}: IUploadAvatarProps) {
	const { uploadAvatar, isUploadingAvatar } = useUploadAvatar()

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (!file) return

		const validation = validateImageFile(file)
		if (!validation.success) {
			toast.error(validation.message)
			return
		}

		uploadAvatar(file)
	}

	return (
		<label className={cn('relative max-w-fit cursor-pointer', className)}>
			<UserAvatar
				src={src}
				fallback={fallback}
				className={cn('size-28', avatarClassName)}
				imageClassName={imageClassName}
				fallbackClassName={cn('text-3xl', fallbackClassName)}
			/>

			<div className="bg-primary text-primary-foreground absolute right-1 bottom-1 rounded-full p-1 shadow-sm">
				<Pencil className="size-3.5" />
			</div>

			<Input
				type="file"
				accept="image/*"
				onChange={handleFileChange}
				disabled={isUploadingAvatar}
				className="hidden"
			/>
		</label>
	)
}
