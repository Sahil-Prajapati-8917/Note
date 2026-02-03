import type { Note, Folder } from '../types/note';
import type { ThemeMode } from '../types/theme';
import type { AppAction } from './actions';

export interface AppState {
    folders: Folder[];
    notes: Note[];
    activeFolderId: string | null;
    activeNoteId: string | null;
    searchQuery: string;
    sidebarVisible: boolean;
    viewMode: 'list' | 'grid';
    theme: ThemeMode;
    focusMode: boolean;
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
    sidebarVisible: true,
    viewMode: 'list',
    theme: 'system',
    focusMode: false,
};

export const appReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
        case 'SET_ACTIVE_FOLDER':
            return { ...state, activeFolderId: action.payload, activeNoteId: null };

        case 'SET_ACTIVE_NOTE':
            return { ...state, activeNoteId: action.payload };

        case 'SET_SEARCH_QUERY':
            return { ...state, searchQuery: action.payload };

        case 'ADD_FOLDER':
            return {
                ...state,
                folders: [
                    ...state.folders,
                    { id: crypto.randomUUID(), name: action.payload, type: 'user' }
                ]
            };

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
            return {
                ...state,
                notes: state.notes.map(n =>
                    n.id === action.payload
                        ? { ...n, deletedAt: new Date().toISOString() }
                        : n
                ),
                activeNoteId: null
            };
        }

        case 'RESTORE_NOTE': {
            return {
                ...state,
                notes: state.notes.map(n =>
                    n.id === action.payload
                        ? { ...n, deletedAt: undefined }
                        : n
                )
            };
        }

        case 'DELETE_NOTE_PERMANENTLY': {
            return {
                ...state,
                notes: state.notes.filter(n => n.id !== action.payload),
                activeNoteId: state.activeNoteId === action.payload ? null : state.activeNoteId
            };
        }

        case 'EMPTY_TRASH': {
            return {
                ...state,
                notes: state.notes.filter(n => !n.deletedAt),
                activeNoteId: null
            };
        }

        case 'TOGGLE_SIDEBAR':
            return { ...state, sidebarVisible: !state.sidebarVisible };

        case 'TOGGLE_FOCUS_MODE':
            return { ...state, focusMode: !state.focusMode, sidebarVisible: state.focusMode }; // Restore sidebar if exiting focus mode? Or just toggle.
        // Requirement says "Hides sidebar and toolbar".
        // If entering focus mode (!state.focusMode -> true), hide sidebar.
        // If exiting, maybe restore? Or just leave hidden.
        // Let's just toggle focusMode. The UI will react.

        case 'SET_VIEW_MODE':
            return { ...state, viewMode: action.payload };

        case 'SET_THEME':
            return { ...state, theme: action.payload };

        case 'LOAD_STATE':
            return { ...initialState, ...action.payload };

        default:
            return state;
    }
};
