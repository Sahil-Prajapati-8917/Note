import { useEffect } from 'react';
import { useAppStore } from '../store/AppContext';
import { createNote } from '../store/actions';

export const useShortcuts = () => {
    const { state, dispatch } = useAppStore();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Cmd/Ctrl + N: New Note
            if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
                e.preventDefault();
                const folderId = state.activeFolderId || 'personal';
                dispatch(createNote(folderId));
            }

            // Cmd/Ctrl + F: Search
            if ((e.metaKey || e.ctrlKey) && e.key === 'f') {
                e.preventDefault();
                const searchInput = document.getElementById('search-input');
                if (searchInput) searchInput.focus();
            }

            // Escape: Blur
            if (e.key === 'Escape') {
                if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [state.activeFolderId, dispatch]);
};
