import { type IUser } from '@/entities/user/model'
import { UserRole } from '@/entities/user/values'
import { UploadAvatar } from '@/features/upload-avatar/ui'
import { cn } from '@/shared/helpers'
import { Badge, Separator } from '@/shared/ui/kit'

const ROLE_BADGE_CONFIG: Record<
	UserRole,
	{ label: string; className?: string }
> = {
	[UserRole.ADMIN]: {
		label: 'Admin',
		className:
			'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
	},
	[UserRole.HR]: {
		label: 'HR',
		className:
			'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
	},
	[UserRole.USER]: {
		label: 'User',
		className:
			'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
	}
} as const

interface IUserInfoProps {
	user: IUser
	avatarUrl: string | null
}

export function UserInfo({ user, avatarUrl }: IUserInfoProps) {
	const roleInfo = ROLE_BADGE_CONFIG[user.role]

	return (
		<div className="relative flex flex-col items-center gap-3">
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
