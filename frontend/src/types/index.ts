export interface Note {
    id: string;
    title: string;
    content: string; // HTML or Markdown
    folderId: string;
    isPinned: boolean;
    createdAt: string; // ISO Date string
    updatedAt: string;
}

export interface Folder {
    id: string;
    name: string;
    type: 'system' | 'user'; // 'system' cannot be deleted/renamed
    icon?: string; // Optional icon override
}

// Global State
export interface AppState {
    folders: Folder[];
    notes: Note[];
    activeFolderId: string;
    activeNoteId: string | null;
    searchQuery: string;
    sidebarVisible: boolean;
}

// Actions
export type Action =
    | { type: 'SET_ACTIVE_FOLDER'; payload: string }
    | { type: 'SET_ACTIVE_NOTE'; payload: string }
    | { type: 'SET_SEARCH_QUERY'; payload: string }
    | { type: 'TOGGLE_SIDEBAR' }
    | { type: 'ADD_NOTE'; payload: Partial<Note> }
    | { type: 'UPDATE_NOTE'; payload: { id: string; changes: Partial<Note> } }
    | { type: 'DELETE_NOTE'; payload: string };
