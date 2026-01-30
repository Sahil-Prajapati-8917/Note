import type { Note } from '../types/note';
import type { ThemeMode } from '../types/theme';

export type AppAction =
    | { type: 'SET_ACTIVE_FOLDER'; payload: string }
    | { type: 'SET_ACTIVE_NOTE'; payload: string | null }
    | { type: 'ADD_NOTE'; payload: { folderId: string } }
    | { type: 'UPDATE_NOTE'; payload: { id: string; changes: Partial<Note> } }
    | { type: 'DELETE_NOTE'; payload: string }
    | { type: 'ADD_FOLDER'; payload: string } // payload is folder name
    | { type: 'SET_SEARCH_QUERY'; payload: string }
    | { type: 'SET_THEME'; payload: ThemeMode }
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
