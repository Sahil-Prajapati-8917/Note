import React from 'react';
import { createPortal } from 'react-dom';
import '../styles/layout.css'; // Ensure we can use same modal styles

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title = 'Delete Note?',
    message = 'Are you sure you want to delete this note? This action cannot be undone.'
}) => {

    // IconX import check - if not available, I'll use text X or similar.
    // Reusing styles from CreateFolderModal which seem to be inline in previous snippet, 
    // let's try to make them consistent or reuse a class if possible.
    // In previous CreateFolderModal, styles were inline. I will copy them for consistency.

    if (!isOpen) return null;

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
                width: '90%',
                maxWidth: '400px',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                color: 'var(--text-primary)'
            }} className="modal-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '17px', fontWeight: 600, margin: 0 }}>{title}</h2>
                    <button
                        onClick={onClose}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', margin: '-8px', color: 'var(--text-secondary)' }}
                    >
                        {/* Placeholder for X icon if not imported, but I saw IconX in CreateFolderModal */}
                        <span style={{ fontSize: 20 }}>×</span>
                    </button>
                </div>

                <div style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {message}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <button
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
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '6px',
                            border: 'none',
                            background: '#ff453a', // Destructive red
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: 600
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};
