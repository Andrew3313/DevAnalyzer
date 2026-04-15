import { type IUser } from '../model'
import { UserRole } from '../values'

interface IUserAccessFlags {
	isAuthenticated: boolean
	isRegularUser: boolean
	hasExtendedAccess: boolean
}

export function getUserAccessFlags(user: IUser | null): IUserAccessFlags {
	const isAuthenticated = !!user
	const isRegularUser = isAuthenticated && user.role === UserRole.USER
	const hasExtendedAccess = isAuthenticated && !isRegularUser

	return { isAuthenticated, isRegularUser, hasExtendedAccess }
}
