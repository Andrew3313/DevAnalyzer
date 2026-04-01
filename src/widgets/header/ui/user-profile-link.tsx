import Link from 'next/link'

import { type IUser } from '@/entities/user/model'
import { UserAvatar } from '@/entities/user/ui'
import { cn } from '@/shared/helpers'
import { buttonVariants } from '@/shared/ui/kit'
import { Route } from '@/shared/values'

interface IUserProfileLinkProps {
	user: IUser
	avatarUrl: string | null
}

export const UserProfileLink = ({ user, avatarUrl }: IUserProfileLinkProps) => (
	<Link
		href={Route.Profile}
		className={cn('max-w-35', buttonVariants({ variant: 'outline' }))}
	>
		<UserAvatar
			src={avatarUrl}
			fallback={user.firstName[0]}
			className="size-5"
		/>

		<span className="truncate">
			{user.firstName} {user.lastName}
		</span>
	</Link>
)
