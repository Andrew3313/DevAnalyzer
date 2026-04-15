import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { uploadAvatarService } from '../api'

export function useUploadAvatar() {
	const router = useRouter()

	const { mutate: uploadAvatar, isPending: isUploadingAvatar } = useMutation({
		mutationKey: ['update-avatar'],
		mutationFn: uploadAvatarService.uploadAvatar,
		onSuccess: () => {
			toast.success('Аватар успешно загружен!')

			router.refresh()
		},
		onError: (error) => {
			console.error('Update avatar error:', error)
			toast.error('Что-то пошло не так, попробуйте еще раз')
		}
	})

	return { uploadAvatar, isUploadingAvatar }
}
