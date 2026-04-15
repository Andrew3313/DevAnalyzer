import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { authService } from '../api'

export function useLogout() {
	const router = useRouter()

	const { mutate: logout, isPending: isLoggingOut } = useMutation({
		mutationKey: ['logout'],
		mutationFn: authService.logout,
		onSuccess() {
			toast.success('Вы успешно вышли из аккаунта!')

			router.refresh()
		},
		onError(error) {
			console.error('Error logout:', error)
			toast.error('Что-то пошло не так, попробуйте еще раз')
		}
	})

	return { logout, isLoggingOut }
}
