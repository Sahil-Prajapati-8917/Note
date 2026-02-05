import { useEffect } from 'react';
import { useAppStore } from '../store/hooks';
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

            // Cmd/Ctrl + Backspace: Delete Note
            if ((e.metaKey || e.ctrlKey) && e.key === 'Backspace') {
                if (state.activeNoteId) {
                    e.preventDefault();
                    if (confirm('Delete note?')) {
                        dispatch({ type: 'DELETE_NOTE', payload: state.activeNoteId });
                    }
                }
            }

            // Keyboard Navigation
            // Cmd + Up/Down: Switch Notes
            if ((e.metaKey || e.ctrlKey) && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
                e.preventDefault();

                // Replicate filter/sort logic from NoteList to ensures navigation matches UI
                const filtered = state.notes.filter(note => {
                    const isTrash = state.activeFolderId === 'trash';
                    const notesInTrash = !!note.deletedAt;
                    if (isTrash) return notesInTrash;
                    if (notesInTrash) return false;

                    const matchesFolder = state.activeFolderId ? note.folderId === state.activeFolderId : true;
                    const matchesSearch = state.searchQuery
                        ? note.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                        note.content.toLowerCase().includes(state.searchQuery.toLowerCase())
                        : true;
                    return matchesFolder && matchesSearch;
                });

                filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

                const currentIndex = filtered.findIndex(n => n.id === state.activeNoteId);
                let nextIndex = currentIndex;

                if (e.key === 'ArrowUp') {
                    nextIndex = currentIndex > 0 ? currentIndex - 1 : filtered.length - 1;
                } else {
                    nextIndex = currentIndex < filtered.length - 1 ? currentIndex + 1 : 0;
                }

                if (filtered[nextIndex]) {
                    dispatch({ type: 'SET_ACTIVE_NOTE', payload: filtered[nextIndex].id });
                }
            }

            // Cmd + Option + Left/Right: Switch Folders
            if ((e.metaKey || e.ctrlKey) && e.altKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
                e.preventDefault();
                const folders = [...state.folders, { id: 'trash', name: 'Trash', type: 'system' as const }];
                const currentIndex = folders.findIndex(f => f.id === state.activeFolderId);
                let nextIndex = currentIndex;

                if (e.key === 'ArrowLeft') {
                    nextIndex = currentIndex > 0 ? currentIndex - 1 : folders.length - 1;
                } else {
                    nextIndex = currentIndex < folders.length - 1 ? currentIndex + 1 : 0;
                }

                if (folders[nextIndex]) {
                    dispatch({ type: 'SET_ACTIVE_FOLDER', payload: folders[nextIndex].id });
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [state.activeFolderId, state.notes, state.searchQuery, state.activeNoteId, dispatch, state.folders]);
};
