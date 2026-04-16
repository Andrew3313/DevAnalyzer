import { type IUser } from '@/entities/user/model'
import { UserRole } from '@/entities/user/values'
import { UploadAvatar } from '@/features/upload-avatar/ui'
import { cn } from '@/shared/helpers'
import { Badge, BadgeColor, Separator } from '@/shared/ui/kit'

const ROLE_BADGE_CONFIG: Record<
	UserRole,
	{ label: string; className?: BadgeColor }
> = {
	[UserRole.ADMIN]: {
		label: 'Admin',
		className: BadgeColor.Blue
	},
	[UserRole.HR]: {
		label: 'HR',
		className: BadgeColor.Green
	},
	[UserRole.USER]: {
		label: 'User',
		className: BadgeColor.Gray
	}
} as const

interface IUserInfoProps {
	user: IUser
	avatarUrl: string | null
	className?: string
}

export function UserInfo({ user, avatarUrl, className }: IUserInfoProps) {
	const roleInfo = ROLE_BADGE_CONFIG[user.role]

	return (
		<div
			className={cn(
				'relative flex flex-col items-center gap-3',
				className
			)}
		>
			<Badge
				className={cn(
					'absolute top-0 right-0 z-10',
					roleInfo.className
				)}
			>
				{roleInfo.label}
			</Badge>

			<UploadAvatar src={avatarUrl} fallback={user.firstName[0]} />

			<div className="flex w-full flex-col gap-1">
				<span className="text-center text-lg font-bold wrap-break-word">
					{user.lastName} {user.firstName} {user.patronymic}
				</span>
				<span className="text-muted-foreground text-center text-xs wrap-break-word">
					{user.position}
					{user.position && user.company && ' · '}
					{user.company}
				</span>
				<span className="text-muted-foreground text-center text-xs wrap-break-word">
					{user.email}
				</span>
			</div>

			<Separator />
		</div>
	)
}
