export interface Note {
    id: string;
    title: string;
    content: string; // HTML content
    folderId: string;
    isPinned: boolean;
    createdAt: string; // ISO Date
    updatedAt: string; // ISO Date
    deletedAt?: string; // ISO Date, if present means in trash
}

export interface Folder {
    id: string;
    name: string;
    type: 'system' | 'user'; // 'system' folders cannot be deleted
}

export type NoteSortOption = 'date-desc' | 'date-asc' | 'title-asc';
