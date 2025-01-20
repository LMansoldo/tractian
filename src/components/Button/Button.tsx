import React from 'react'

type ButtonSize = 'small' | 'medium' | 'large'
type ButtonType = 'primary' | 'secondary'

interface ButtonProps {
	onClick: () => void
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
	primary: 'bg-blue-900 border-blue-800 text-white hover:bg-blue-700',
	secondary: 'bg-white border-slate-300 text-slate-700  hover:bg-blue-600 hover:text-white',
}

const Button: React.FC<ButtonProps> = ({
	onClick,
	children,
	icon,
	size = 'medium',
	type = 'primary',
}) => {
	return (
		<button
			onClick={onClick}
			className={` rounded-sm ${sizeClasses[size]} ${typeClasses[type]} text-slate flex items-center justify-center border font-semibold`}
			aria-label={typeof children === 'string' ? children : undefined}
		>
			{icon && <span className="ml-2">{icon}</span>}
			{children}
		</button>
	)
}

export default Button
