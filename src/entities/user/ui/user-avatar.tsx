import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/kit'

export interface IUserAvatarProps {
	src?: string | null
	fallback?: string
	className?: string
	imageClassName?: string
	fallbackClassName?: string
}

export const UserAvatar = ({
	src,
	fallback = 'U',
	className,
	imageClassName,
	fallbackClassName
}: IUserAvatarProps) => (
	<Avatar className={className}>
		<AvatarImage className={imageClassName} src={src || undefined} />
		<AvatarFallback className={fallbackClassName}>
			{fallback}
		</AvatarFallback>
	</Avatar>
)
