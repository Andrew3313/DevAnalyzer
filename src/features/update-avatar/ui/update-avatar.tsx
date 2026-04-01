'use client'

import { Pencil } from 'lucide-react'

import { IUserAvatarProps, UserAvatar } from '@/entities/user/ui'
import { cn } from '@/shared/helpers'
import { Input } from '@/shared/ui/kit'

import { useUpdateAvatar } from '../hooks'

interface IUpdateAvatarProps extends IUserAvatarProps {
	avatarClassName?: string
}

export function UpdateAvatar({
	src,
	fallback,
	className,
	imageClassName,
	fallbackClassName,
	avatarClassName
}: IUpdateAvatarProps) {
	const { updateAvatar, isUpdatingAvatar } = useUpdateAvatar()

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (!file) return

		updateAvatar(file)
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
				disabled={isUpdatingAvatar}
				className="hidden"
			/>
		</label>
	)
}
