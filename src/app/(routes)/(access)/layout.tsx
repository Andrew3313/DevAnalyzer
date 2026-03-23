interface IAccessLayoutProps {
	children: React.ReactNode
}

export default function AccessLayout({
	children
}: Readonly<IAccessLayoutProps>) {
	return (
		<div className="flex min-h-[80vh] items-center justify-center p-6">
			{children}
		</div>
	)
}
