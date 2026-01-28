import type { ReactNode } from 'react';
import { useShortcuts } from '../../lib/useShortcuts';
import { useAppStore } from '../../store/AppContext';
import '../../styles/reset.css';
import '../../styles/variables.css';
import '../../styles/layout.css';

export const AppShell = ({ children }: { children: ReactNode }) => {
    useShortcuts(); // Global shortcuts listener
    const { state } = useAppStore();

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
        </div>
    );
};
