import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { userService } from '@/entities/user/api'

export function useUpdateProfile() {
	const router = useRouter()

	const { mutate: updateProfile, isPending: isUpdatingProfile } = useMutation(
		{
			mutationKey: ['update-profile'],
			mutationFn: userService.updateInfo,
			onSuccess: () => {
				toast.success('Профиль успешно обновлен!', {
					position: 'bottom-center'
				})

				router.refresh()
			},
			onError(error) {
				console.error('Error update profile:', error)
				toast.error('Что-то пошло не так, попробуйте еще раз', {
					position: 'bottom-center'
				})
			}
		}
	)

	return { updateProfile, isUpdatingProfile }
}
