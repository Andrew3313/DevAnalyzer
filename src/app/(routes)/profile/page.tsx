import { getServerUserData } from '@/entities/user/api'
import { UpdateProfileForm } from '@/features/update-profile/ui'
import { StateMessage } from '@/shared/ui'

export default async function Profile() {
	const { user } = await getServerUserData()

	if (!user) {
		return (
			<StateMessage
				title="Ошибка загрузки данных"
				description="Попробуйте обновить страницу"
			/>
		)
	}

	return <UpdateProfileForm user={user} />
}
