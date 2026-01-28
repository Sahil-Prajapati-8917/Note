import type { Note } from '../types/note';

export type DateGroup = 'Today' | 'Previous 7 Days' | 'Previous 30 Days' | 'Older';

export const getDateGroup = (dateStr: string): DateGroup => {
    const date = new Date(dateStr);
    const now = new Date();

    // Hours difference
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffHours = diffTime / (1000 * 60 * 60);

    // Check if same calendar day for "Today"
    const isSameDay = now.getDate() === date.getDate() &&
        now.getMonth() === date.getMonth() &&
        now.getFullYear() === date.getFullYear();

    if (diffHours < 24 && isSameDay) return 'Today';

    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays < 7) return 'Previous 7 Days';
    if (diffDays < 30) return 'Previous 30 Days';

    return 'Older';
};

export const groupNotesByDate = (notes: Note[]): Record<DateGroup, Note[]> => {
    const groups: Record<DateGroup, Note[]> = {
        'Today': [],
        'Previous 7 Days': [],
        'Previous 30 Days': [],
        'Older': []
    };

    notes.forEach(note => {
        const group = getDateGroup(note.updatedAt);
        groups[group].push(note);
    });

    return groups;
};
