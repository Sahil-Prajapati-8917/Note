import React from 'react';
import '../../styles/variables.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    fullWidth?: boolean;
    icon?: React.ReactNode;
}

export const Input = ({ fullWidth, icon, style, ...props }: InputProps) => {
    return (
        <div style={{ position: 'relative', width: fullWidth ? '100%' : 'auto' }}>
            {icon && (
                <div style={{
                    position: 'absolute',
                    left: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)'
                }}>
                    {icon}
                </div>
            )}
            <input
                style={{
                    width: '100%',
                    padding: icon ? '0 12px 0 32px' : '0 12px',
                    borderRadius: '8px',
                    height: '32px',
                    fontSize: '13px',
                    backgroundColor: 'var(--bg-hover)',
                    color: 'var(--text-primary)',
                    border: 'none', // Reset default border
                    outline: 'none',
                    transition: 'background-color 0.2s',
                    ...style
                }}
                onFocus={(e) => e.target.style.backgroundColor = 'var(--bg-active)'}
                onBlur={(e) => e.target.style.backgroundColor = 'var(--bg-hover)'}
                {...props}
            />
        </div>
    );
};
