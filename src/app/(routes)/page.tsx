import { ToggleTheme } from '@/features/toggle-theme/ui'
import { Logo } from '@/shared/ui/icons'

export default function Home() {
	return (
		<div className="flex items-center justify-between">
			<Logo size="lg" />
			<ToggleTheme />
		</div>
	)
}
