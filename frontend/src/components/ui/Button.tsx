import React from 'react';
import '../../styles/variables.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'ghost' | 'icon';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = ({
    className = '',
    variant = 'primary',
    size = 'md',
    children,
    ...props
}: ButtonProps) => {
    const baseStyle: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '6px',
        transition: 'all 0.1s ease-out',
        fontWeight: 500,
        gap: '6px'
    };

    const variants = {
        primary: {
            backgroundColor: 'var(--accent-color)',
            color: '#fff',
        },
        ghost: {
            backgroundColor: 'transparent',
            color: 'var(--text-primary)',
        },
        icon: {
            backgroundColor: 'transparent',
            color: 'var(--text-secondary)',
            borderRadius: '6px',
        }
    };

    const sizes = {
        sm: { height: '28px', fontSize: '13px', padding: '0 8px' },
        md: { height: '32px', fontSize: '14px', padding: '0 12px' },
        lg: { height: '40px', fontSize: '15px', padding: '0 16px' }
    };

    // For icon variant, make it square
    const finalSize = variant === 'icon'
        ? { width: sizes[size].height, height: sizes[size].height, padding: 0 }
        : sizes[size];

    return (
        <button
            className={`ui-button ${className}`}
            style={{ ...baseStyle, ...variants[variant], ...finalSize }}
            onMouseOver={(e) => {
                if (variant !== 'primary') e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
            }}
            onMouseOut={(e) => {
                if (variant !== 'primary') e.currentTarget.style.backgroundColor = 'transparent';
            }}
            {...props}
        >
            {children}
        </button>
    );
};
