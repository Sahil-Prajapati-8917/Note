import type { Action, AppState, Folder, Note } from '../types';

export const INITIAL_FOLDERS: Folder[] = [
    { id: 'all-notes', name: 'All Notes', type: 'system', icon: 'tray' },
    { id: 'personal', name: 'Personal', type: 'user', icon: 'folder' },
    { id: 'work', name: 'Work', type: 'user', icon: 'briefcase' },
    { id: 'ideas', name: 'Ideas', type: 'user', icon: 'lightbulb' },
];

const now = new Date().toISOString();
const yesterday = new Date(Date.now() - 86400000).toISOString();

export const INITIAL_NOTES: Note[] = [
    {
        id: '1',
        title: 'Welcome to Nebula Notes',
        content: `<p>Welcome to <strong>Nebula Notes</strong>.</p><p>This is a place for your best thinking. No distractions, just you and your ideas.</p><ul><li>Try creating a new note</li><li>Organize with folders</li><li>Enjoy the silence</li></ul>`,
        folderId: 'personal',
        isPinned: true,
        createdAt: now,
        updatedAt: now,
    },
    {
        id: '2',
        title: 'Product Vision',
        content: `<p>Nebula Notes is a <strong>distraction-free, premium note-taking app</strong> designed for deep thinking, long writing, and structured ideas.</p><p>The product should feel:</p><ul><li>Quiet</li><li>Elegant</li><li>Intentional</li><li>Effortless</li></ul>`,
        folderId: 'work',
        isPinned: false,
        createdAt: yesterday,
        updatedAt: yesterday,
    },
    {
        id: '3',
        title: 'Meeting Notes: Q1 Roadmap',
        content: `<p><strong>Attendees:</strong> Sarah, Mike, Alex</p><p>Discussion points:</p><ul><li>Launch timeline</li><li>Marketing budget</li><li>Team expansion</li></ul>`,
        folderId: 'work',
        isPinned: false,
        createdAt: yesterday,
        updatedAt: yesterday,
    },
    {
        id: '4',
        title: 'Book Recommendations',
        content: `<p>To read this year:</p><ul><li>The Design of Everyday Things</li><li>Deep Work</li><li>Atomic Habits</li></ul>`,
        folderId: 'ideas',
        isPinned: false,
        createdAt: yesterday,
        updatedAt: yesterday,
    }
];

export const initialState: AppState = {
    folders: INITIAL_FOLDERS,
    notes: INITIAL_NOTES,
    activeFolderId: 'all-notes',
    activeNoteId: '1', // Select first note by default
    searchQuery: '',
    sidebarVisible: true,
    theme: 'system',
};

export const reducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case 'SET_ACTIVE_FOLDER':
            return { ...state, activeFolderId: action.payload, activeNoteId: null }; // Reset selection on folder switch
        case 'SET_ACTIVE_NOTE':
            return { ...state, activeNoteId: action.payload };
        case 'SET_SEARCH_QUERY':
            return { ...state, searchQuery: action.payload };
        case 'TOGGLE_SIDEBAR':
            return { ...state, sidebarVisible: !state.sidebarVisible };
        case 'ADD_NOTE': {
            const newNote: Note = {
                id: crypto.randomUUID(),
                title: 'New Note',
                content: '',
                folderId: action.payload.folderId,
                isPinned: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            return { ...state, notes: [newNote, ...state.notes], activeNoteId: newNote.id };
        }
        case 'UPDATE_NOTE':
            return {
                ...state,
                notes: state.notes.map((note) =>
                    note.id === action.payload.id
                        ? { ...note, ...action.payload.changes, updatedAt: new Date().toISOString() }
                        : note
                ),
            };
        case 'DELETE_NOTE':
            return {
                ...state,
                notes: state.notes.filter((n) => n.id !== action.payload),
                activeNoteId: null,
            };
        default:
            return state;
    }
};
