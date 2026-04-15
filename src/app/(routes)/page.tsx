import { getServerUserData } from '@/entities/user/api'
import { AnalyzeHero } from '@/widgets/analyze-hero/ui'
import { Capabilities } from '@/widgets/capabilities/ui'

export default async function HomePage() {
	const { user } = await getServerUserData()

	return (
		<>
			<AnalyzeHero user={user} />
			<Capabilities />
		</>
	)
}
