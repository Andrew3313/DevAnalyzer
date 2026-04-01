import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { userService } from '@/entities/user/api'
import { type TUpdateUserInfoApiRequest } from '@/entities/user/model'

export function useUpdateProfile() {
	const router = useRouter()

	const { mutate: updateProfile, isPending: isUpdatingProfile } = useMutation(
		{
			mutationKey: ['update-profile'],
			mutationFn: (values: TUpdateUserInfoApiRequest) =>
				userService.updateInfo(values),
			onSuccess: () => {
				toast.success('Профиль успешно обновлен!')

				router.refresh()
			},
			onError(error) {
				console.error('Error update profile:', error)
				toast.error('Что-то пошло не так, попробуйте еще раз')
			}
		}
	)

	return { updateProfile, isUpdatingProfile }
}
