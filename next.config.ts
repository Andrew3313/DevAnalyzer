import { type NextConfig } from 'next'

const nextConfig: NextConfig = {
	reactCompiler: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'devanalyzer.storage.yandexcloud.net'
			}
		]
	}
}

export default nextConfig
