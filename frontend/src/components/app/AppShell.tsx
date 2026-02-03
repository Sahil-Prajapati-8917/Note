import { useState, useEffect, type ReactNode } from 'react';
import { CommandPalette } from '../CommandPalette';
import { useShortcuts } from '../../lib/useShortcuts';
import { useAppStore } from '../../store/AppContext';
import '../../styles/reset.css';
import '../../styles/variables.css';
import '../../styles/layout.css';

export const AppShell = ({ children }: { children: ReactNode }) => {
    useShortcuts(); // Global shortcuts listener
    const { state, dispatch } = useAppStore();
    const [isPaletteOpen, setPaletteOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setPaletteOpen(prev => !prev);
            }
            if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'f') {
                e.preventDefault();
                dispatch({ type: 'TOGGLE_FOCUS_MODE' });
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Determine current mobile view
    let viewClass = 'view-sidebar';
    if (state.activeNoteId) {
        viewClass = 'view-editor';
    } else if (state.activeFolderId) {
        viewClass = 'view-list';
    }

    return (
        <div className={`app-shell ${viewClass}`}>
            {children}
            <CommandPalette isOpen={isPaletteOpen} onClose={() => setPaletteOpen(false)} />
        </div>
    );
};
