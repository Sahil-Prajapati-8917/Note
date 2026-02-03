import type { Note } from '../types/note';
import type { ThemeMode } from '../types/theme';

export type AppAction =
    | { type: 'SET_ACTIVE_FOLDER'; payload: string }
    | { type: 'SET_ACTIVE_NOTE'; payload: string | null }
    | { type: 'ADD_NOTE'; payload: { folderId: string } }
    | { type: 'UPDATE_NOTE'; payload: { id: string; changes: Partial<Note> } }
    | { type: 'DELETE_NOTE'; payload: string }
    | { type: 'RESTORE_NOTE'; payload: string }
    | { type: 'DELETE_NOTE_PERMANENTLY'; payload: string }
    | { type: 'EMPTY_TRASH' }
    | { type: 'ADD_FOLDER'; payload: string } // payload is folder name
    | { type: 'SET_SEARCH_QUERY'; payload: string }
    | { type: 'SET_THEME'; payload: ThemeMode }
    | { type: 'TOGGLE_SIDEBAR' }
    | { type: 'TOGGLE_FOCUS_MODE' }
    | { type: 'SET_VIEW_MODE'; payload: 'list' | 'grid' }
    | { type: 'LOAD_STATE'; payload: any }; // For hydration

export const createNote = (folderId: string): AppAction => ({
    type: 'ADD_NOTE',
    payload: { folderId }
});

export const createFolder = (name: string): AppAction => ({
    type: 'ADD_FOLDER',
    payload: name
});

export const updateNote = (id: string, changes: Partial<Note>): AppAction => ({
    type: 'UPDATE_NOTE',
    payload: { id, changes }
});

export const deleteNote = (id: string): AppAction => ({
    type: 'DELETE_NOTE',
    payload: id
});

export const restoreNote = (id: string): AppAction => ({
    type: 'RESTORE_NOTE',
    payload: id
});

export const deleteNotePermanently = (id: string): AppAction => ({
    type: 'DELETE_NOTE_PERMANENTLY',
    payload: id
});

export const emptyTrash = (): AppAction => ({
    type: 'EMPTY_TRASH'
});
