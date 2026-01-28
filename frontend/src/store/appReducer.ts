import type { Note, Folder } from '../types/note';
import type { ThemeMode } from '../types/theme';
import type { AppAction } from './actions';

export interface AppState {
    folders: Folder[];
    notes: Note[];
    activeFolderId: string | null;
    activeNoteId: string | null;
    searchQuery: string;
    theme: ThemeMode;
}

export const initialState: AppState = {
    folders: [
        { id: 'personal', name: 'Personal', type: 'system' },
        { id: 'work', name: 'Work', type: 'system' },
        { id: 'ideas', name: 'Ideas', type: 'system' }
    ],
    notes: [],
    activeFolderId: 'personal',
    activeNoteId: null,
    searchQuery: '',
    theme: 'system',
};

export const appReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
        case 'SET_ACTIVE_FOLDER':
            return { ...state, activeFolderId: action.payload, activeNoteId: null };

        case 'SET_ACTIVE_NOTE':
            return { ...state, activeNoteId: action.payload };

        case 'SET_SEARCH_QUERY':
            return { ...state, searchQuery: action.payload };

        case 'ADD_NOTE': {
            const newNote: Note = {
                id: crypto.randomUUID(),
                title: '',
                content: '',
                folderId: action.payload.folderId,
                isPinned: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            return {
                ...state,
                notes: [newNote, ...state.notes],
                activeNoteId: newNote.id
            };
        }

        case 'UPDATE_NOTE': {
            return {
                ...state,
                notes: state.notes.map(note =>
                    note.id === action.payload.id
                        ? { ...note, ...action.payload.changes, updatedAt: new Date().toISOString() }
                        : note
                )
            };
        }

        case 'DELETE_NOTE': {
            const nextNotes = state.notes.filter(n => n.id !== action.payload);
            return {
                ...state,
                notes: nextNotes,
                activeNoteId: null
            };
        }

        case 'SET_THEME':
            return { ...state, theme: action.payload };

        case 'LOAD_STATE':
            return { ...initialState, ...action.payload };

        default:
            return state;
    }
};
