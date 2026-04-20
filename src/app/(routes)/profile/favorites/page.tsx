import { type Metadata } from 'next'

import { ProfileFavorites } from '@/widgets/profile-favorites/ui'

export const metadata: Metadata = {
	title: 'Избранное'
}

export default function ProfileFavoritesPage() {
	return <ProfileFavorites />
}
