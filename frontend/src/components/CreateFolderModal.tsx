import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { IconX } from './ui/Icons'; // We'll create this or use inline styles for now. Tailwind is easier if configured.

interface CreateFolderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (name: string) => void;
}

export const CreateFolderModal: React.FC<CreateFolderModalProps> = ({ isOpen, onClose, onCreate }) => {
    const [name, setName] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setName('');
            setTimeout(() => inputRef.current?.focus(), 50); // Focus after mount
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onCreate(name.trim());
            onClose();
        }
    };

    return createPortal(
        <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
        }}>
            <div style={{
                backgroundColor: 'var(--bg-sidebar)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                padding: '24px',
                borderRadius: '12px',
                boxShadow: 'var(--shadow-lg)',
                width: '90%', // Responsive width
                maxWidth: '400px',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                color: 'var(--text-primary)'
            }} className="modal-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '17px', fontWeight: 600, margin: 0 }}>New Folder</h2>
                    <button
                        onClick={onClose}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', margin: '-8px', color: 'var(--text-secondary)' }} // Increased touch target
                    >
                        <IconX style={{ width: 22, height: 22 }} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Folder Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '10px 12px',
                            borderRadius: '8px',
                            border: '1px solid var(--border-heavy)',
                            fontSize: '15px',
                            outline: 'none',
                            backgroundColor: 'var(--bg-app)',
                            color: 'var(--text-primary)'
                        }}
                    />

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '6px',
                                border: '1px solid var(--border-subtle)',
                                background: 'transparent',
                                cursor: 'pointer',
                                fontSize: '14px',
                                color: 'var(--text-primary)',
                                fontWeight: 500
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!name.trim()}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '6px',
                                border: 'none',
                                background: 'var(--accent-color)',
                                color: 'white', // Accent color text is usually white or inverse
                                cursor: name.trim() ? 'pointer' : 'not-allowed',
                                fontSize: '14px',
                                fontWeight: 600,
                                opacity: name.trim() ? 1 : 0.5
                            }}
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};
