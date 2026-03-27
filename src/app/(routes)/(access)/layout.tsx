interface IAccessLayoutProps {
	children: React.ReactNode
}

export default function AccessLayout({
	children
}: Readonly<IAccessLayoutProps>) {
	return (
		<div className="flex min-h-[60vh] items-center justify-center px-4">
			{children}
		</div>
	)
}
