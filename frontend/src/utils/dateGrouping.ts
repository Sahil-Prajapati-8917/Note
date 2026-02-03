import type { Note } from '../types/note';

export type DateGroup = 'Today' | 'Yesterday' | 'Previous 7 Days' | 'Previous 30 Days' | 'Older';

export const getDateGroup = (dateStr: string): DateGroup => {
    const date = new Date(dateStr);
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfYesterday = new Date(startOfToday);
    startOfYesterday.setDate(startOfToday.getDate() - 1);

    if (date >= startOfToday) return 'Today';
    if (date >= startOfYesterday) return 'Yesterday';

    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays < 7) return 'Previous 7 Days';
    if (diffDays < 30) return 'Previous 30 Days';

    return 'Older';
};

export const groupNotesByDate = (notes: Note[]): Record<DateGroup, Note[]> => {
    const groups: Record<DateGroup, Note[]> = {
        'Today': [],
        'Yesterday': [],
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
