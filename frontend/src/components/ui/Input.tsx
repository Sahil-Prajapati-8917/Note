import React from 'react';
import '../../styles/variables.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    fullWidth?: boolean;
}

export const Input = ({ fullWidth, style, ...props }: InputProps) => {
    return (
        <input
            style={{
                width: fullWidth ? '100%' : 'auto',
                padding: '0 12px',
                borderRadius: '8px',
                height: '32px',
                fontSize: '13px',
                backgroundColor: 'var(--bg-hover)',
                color: 'var(--text-primary)',
                transition: 'background-color 0.2s',
                ...style
            }}
            onFocus={(e) => e.target.style.backgroundColor = 'var(--bg-active)'}
            onBlur={(e) => e.target.style.backgroundColor = 'var(--bg-hover)'}
            {...props}
        />
    );
};
