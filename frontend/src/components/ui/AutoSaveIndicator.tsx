import { useEffect, useState } from 'react';
import { useAppStore } from '../../store/AppContext';

export const AutoSaveIndicator = () => {
    const { state } = useAppStore();
    const [saved, setSaved] = useState(false);
    const activeNote = state.notes.find(n => n.id === state.activeNoteId);

    useEffect(() => {
        if (!activeNote) return;
        setSaved(true);
        const timer = setTimeout(() => setSaved(false), 800);
        return () => clearTimeout(timer);
    }, [activeNote?.updatedAt]);

    if (!saved) return null;

    return (
        <div style={{
            position: 'absolute',
            top: '20px',
            right: '25px',
            fontSize: '11px',
            color: 'var(--text-secondary)',
            opacity: 0.7,
            animation: 'pulse 1s',
            fontWeight: 500
        }}>
            Saved
        </div>
    );
};
