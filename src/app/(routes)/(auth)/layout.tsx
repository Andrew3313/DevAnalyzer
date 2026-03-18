interface IAuthLayoutProps {
	children: React.ReactNode
}

export default function AuthLayout({ children }: Readonly<IAuthLayoutProps>) {
	return (
		<div className="flex min-h-[80vh] items-center justify-center p-6">
			{children}
		</div>
	)
}
