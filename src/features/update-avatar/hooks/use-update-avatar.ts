import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { updateAvatarService } from '../api'

export function useUpdateAvatar() {
	const router = useRouter()

	const { mutate: updateAvatar, isPending: isUpdatingAvatar } = useMutation({
		mutationKey: ['update-avatar'],
		mutationFn: (file: File) => updateAvatarService.updateAvatar(file),
		onSuccess: () => {
			toast.success('Аватар успешно обновлен!')

			router.refresh()
		},
		onError: (error) => {
			console.error('Update avatar error:', error)
			toast.error('Что-то пошло не так, попробуйте еще раз')
		}
	})

	return { updateAvatar, isUpdatingAvatar }
}
