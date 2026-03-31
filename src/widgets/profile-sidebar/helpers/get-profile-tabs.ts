import { UserRole } from '@/entities/user/values'

import { PROFILE_TABS } from '../model'

export const getProfileTabs = (role: UserRole) =>
	PROFILE_TABS.filter((tab) => tab.roles.includes(role))
