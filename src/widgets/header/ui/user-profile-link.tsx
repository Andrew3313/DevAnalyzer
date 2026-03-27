import { User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { type IUser } from '@/entities/user/model'
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
		{avatarUrl ? (
			<div className="relative size-5 shrink-0 overflow-hidden rounded-full">
				<Image
					src={avatarUrl}
					alt="User avatar"
					fill
					className="object-cover"
				/>
			</div>
		) : (
			<User className="size-5" />
		)}

		<span className="truncate">
			{user.firstName} {user.lastName}
		</span>
	</Link>
)
