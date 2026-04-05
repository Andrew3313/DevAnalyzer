'use client'

import { useRef, useState } from 'react'

import { cn } from '@/shared/helpers'
import { useOnClickOutside } from '@/shared/hooks'
import { FieldError } from '@/shared/ui/kit'

export interface IExpandableInputProps extends React.ComponentProps<'input'> {
	dropdownContent?: React.ReactNode
	errorMessage?: string
	containerClassName?: string
	dropdownClassName?: string
}

export function ExpandableInput({
	dropdownContent,
	errorMessage,
	onFocus,
	onKeyDown,
	className,
	containerClassName,
	dropdownClassName,
	...inputProps
}: IExpandableInputProps) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)

	const containerRef = useRef<HTMLDivElement | null>(null)
	useOnClickOutside(containerRef, () => setIsDropdownOpen(false))

	const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		setIsDropdownOpen(true)
		onFocus?.(e)
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Escape' && isDropdownOpen) {
			setIsDropdownOpen(false)
			e.currentTarget.blur()
		}

		onKeyDown?.(e)
	}

	const dynamicDropdownClasses = cn(
		{
			'animate-dropdown':
				isDropdownOpen && (errorMessage || dropdownContent),
			'border-ring ring-ring/50 ring-1': isDropdownOpen && !errorMessage,
			'border-destructive ring-destructive/20 ring-1':
				isDropdownOpen && errorMessage
		},
		dropdownClassName
	)

	return (
		<div
			ref={containerRef}
			className={cn('relative mx-auto max-w-xl', containerClassName)}
		>
			<div className="relative">
				<input
					{...inputProps}
					data-slot="input"
					onFocus={handleFocus}
					onKeyDown={handleKeyDown}
					className={cn(
						'placeholder:text-muted-foreground relative z-30 h-12 w-full rounded-md bg-transparent px-2.5 py-1 text-base shadow-none outline-none disabled:pointer-events-none disabled:cursor-not-allowed md:text-sm',
						className
					)}
				/>
			</div>

			<div
				className={cn(
					'bg-card border-input absolute top-0 right-0 left-0 z-10 origin-top rounded-md border pt-12 shadow-sm transition-[color,box-shadow]',
					dynamicDropdownClasses
				)}
			>
				{isDropdownOpen && (
					<div className="scrollbar-hide max-h-36 overflow-y-auto px-2.5">
						{errorMessage && (
							<FieldError className="mb-2.5 text-start">
								{errorMessage}
							</FieldError>
						)}

						{dropdownContent}
					</div>
				)}
			</div>
		</div>
	)
}
