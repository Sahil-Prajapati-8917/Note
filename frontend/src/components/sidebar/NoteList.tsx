import { useAppStore } from '../../store/hooks';
import type { DateGroup } from '../../utils/dateGrouping';
import { groupNotesByDate } from '../../utils/dateGrouping';
import { Input } from '../ui/Input';
import { IconChevronLeft } from '../ui/Icons';
import '../../styles/layout.css';

export const NoteList = () => {
    const { state, dispatch } = useAppStore();

    // 1. Filter
    const filtered = state.notes.filter(note => {
        const isTrash = state.activeFolderId === 'trash';
        const notesInTrash = !!note.deletedAt;

        if (isTrash) {
            return notesInTrash;
        }

        if (notesInTrash) return false;

        const matchesFolder = state.activeFolderId ? note.folderId === state.activeFolderId : true;
        const matchesSearch = state.searchQuery
            ? note.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            note.content.toLowerCase().includes(state.searchQuery.toLowerCase())
            : true;
        return matchesFolder && matchesSearch;
    });

    // 2. Sort (Descending by default)
    filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    // 3. Group
    const groups = groupNotesByDate(filtered);
    const groupOrder: DateGroup[] = ['Today', 'Yesterday', 'Previous 7 Days', 'Previous 30 Days', 'Older'];

    const isEmpty = filtered.length === 0;

    const getPreview = (note: import('../../types/note').Note) => {
        // Strip tags
        const text = note.content.replace(/<[^>]+>/g, '');
        // If title is part of content (first line), strip it from preview? 
        // For now, just return remaining text.
        // Simple approach: Take lines 2+ if possible, or just text.
        // Given title is separate in data model right now (sync'd), we can just subtract title?
        // Let's just show text slice for now, maybe title repeats but that's okay.
        return text.slice(0, 60) || 'No additional text';
    };

    return (
        <div className={`notelist-container ${state.viewMode === 'grid' ? 'full-width' : ''}`}>
            <div className="notelist-header">
                <div
                    className="mobile-back-btn"
                    onClick={() => dispatch({ type: 'SET_ACTIVE_FOLDER', payload: '' })} // Empty string to clear
                >
                    <IconChevronLeft />
                </div>
                <Input
                    id="search-input"
                    placeholder="Search"
                    fullWidth
                    value={state.searchQuery}
                    onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
                />
            </div>

            <div className={`notelist-scroll ${state.viewMode === 'grid' ? 'grid-view' : ''}`}>
                {isEmpty && (
                    <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '13px', width: '100%' }}>
                        No notes
                    </div>
                )}

                {groupOrder.map(groupLabel => {
                    const notes = groups[groupLabel];
                    if (notes.length === 0) return null;

                    if (state.viewMode === 'list') {
                        return (
                            <div key={groupLabel}>
                                <div className="group-header">{groupLabel}</div>
                                {notes.map((note, index) => (
                                    <div
                                        key={note.id}
                                        className={`note-item ${state.activeNoteId === note.id ? 'active' : ''}`}
                                        onClick={() => dispatch({ type: 'SET_ACTIVE_NOTE', payload: note.id })}
                                        style={{ animationDelay: `${index * 0.05}s` }}
                                    >
                                        <div className="note-title">
                                            {note.title || 'New Note'}
                                        </div>
                                        <div className="note-meta" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                                            <div className="note-date" style={{ fontSize: 13, color: 'var(--text-secondary)', marginRight: 6 }}>
                                                {new Date(note.updatedAt).toLocaleDateString([], { day: 'numeric', month: 'numeric', year: '2-digit' })}
                                            </div>
                                            <div className="note-preview">
                                                {getPreview(note)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    } else {
                        // Grid View - Just render cards, maybe with headers or flat?
                        // macOS Notes usually flattens or keeps headers. Let's keep headers for now but flex wrap.
                        return (
                            <div key={groupLabel} className="grid-group">
                                <div className="group-header" style={{ width: '100%' }}>{groupLabel}</div>
                                <div className="grid-items-container">
                                    {notes.map((note, index) => (
                                        <div
                                            key={note.id}
                                            className={`note-card-wrapper ${state.activeNoteId === note.id ? 'active' : ''}`}
                                            onClick={() => {
                                                dispatch({ type: 'SET_ACTIVE_NOTE', payload: note.id });
                                                // Open note (switch to list view) on click
                                                dispatch({ type: 'SET_VIEW_MODE', payload: 'list' });
                                            }}
                                            style={{ animationDelay: `${index * 0.03}s` }}
                                        >
                                            <div className="note-card-preview-box">
                                                <div className="note-card-preview-content">
                                                    {getPreview(note)}
                                                </div>
                                            </div>
                                            <div className="note-card-meta">
                                                <div className="note-card-title">
                                                    {note.title || 'New Note'}
                                                </div>
                                                <div className="note-card-date">
                                                    {new Date(note.updatedAt).toLocaleDateString([], { day: '2-digit', month: '2-digit', year: '2-digit' })}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
};
