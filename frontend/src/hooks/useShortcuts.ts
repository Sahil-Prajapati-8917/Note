import { useEffect } from 'react';
import { useStore } from '../store/StoreContext';

export const useShortcuts = () => {
    const { state, dispatch } = useStore();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Cmd/Ctrl + N: New Note
            if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
                e.preventDefault();
                dispatch({
                    type: 'ADD_NOTE',
                    payload: { folderId: state.activeFolderId === 'all-notes' ? 'personal' : state.activeFolderId || 'personal' },
                });
            }

            // Cmd/Ctrl + F: Search
            if ((e.metaKey || e.ctrlKey) && e.key === 'f') {
                e.preventDefault();
                const searchInput = document.querySelector('.search-bar') as HTMLInputElement;
                if (searchInput) {
                    searchInput.focus();
                }
            }

            // Escape: Blur
            if (e.key === 'Escape') {
                const activeElement = document.activeElement as HTMLElement;
                if (activeElement) {
                    activeElement.blur();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [state.activeFolderId, dispatch]);
};
