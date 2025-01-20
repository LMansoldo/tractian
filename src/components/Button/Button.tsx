import React from 'react';

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonType = 'primary' | 'secondary';

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    icon?: React.ReactNode;
    size?: ButtonSize;
    type?: ButtonType;
}

const sizeClasses = {
    small: 'p-1 text-sm',
    medium: 'px-2 py-1 text-base',
    large: 'p-4 text-lg',
};

const typeClasses = {
    primary: 'bg-blue-900 border-blue-800 text-white hover:bg-blue-700',
    secondary: 'bg-white border-blue-600 text-blue-600 hover:bg-blue-100',
};

const Button: React.FC<ButtonProps> = ({ onClick, children, icon, size = 'medium', type = 'primary' }) => {
    return (
        <button
            onClick={onClick}
            className={`shadow-md rounded-square ${sizeClasses[size]} ${typeClasses[type]} flex items-center justify-center border`}
            aria-label={typeof children === 'string' ? children : undefined}
        >
            {icon && <span className="ml-2">{icon}</span>}
            {children}
        </button>
    );
};

export default Button