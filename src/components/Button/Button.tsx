import React from 'react'

type ButtonSize = 'small' | 'medium' | 'large'
type ButtonType = 'primary' | 'secondary'

interface ButtonProps {
	onClick: () => void
	onMouseEnter?: () => void
	onMouseLeave?: () => void
	isSelected?: boolean | undefined
	children: React.ReactNode
	icon?: React.ReactNode
	size?: ButtonSize
	type?: ButtonType
}

const sizeClasses = {
	small: 'px-2 py-1 text-sm',
	medium: 'px-4 py-1 text-base',
	large: 'p-4 text-lg',
}

const typeClasses = {
	primary: 'bg-blue-900 border-blue-900 text-white hover:bg-blue-700',
	secondary: 'bg-white border-slate-300 text-slate-700 hover:bg-blue-600 hover:text-white',
}

const setSelectedStatus = (selected: boolean | undefined, type: 'primary' | 'secondary') => {
	if (selected && type === 'primary') return 'bg-blue-700'
	if (selected && type === 'secondary') return 'bg-blue-600 text-white'
}

const Button: React.FC<ButtonProps> = ({
	onClick,
	onMouseEnter,
	onMouseLeave,
	isSelected,
	children,
	size = 'medium',
	type = 'primary',
}) => {
	return (
		<button
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			className={`rounded-sm ${sizeClasses[size]} ${typeClasses[type]} ${setSelectedStatus(isSelected, type)} text-slate items-center justify-center border font-semibold flex flex-row gap-2`}
			aria-label={typeof children === 'string' ? children : undefined}
		>
			{children}
		</button>
	)
}

export default Button
