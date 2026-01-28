import { useAppStore } from '../../store/AppContext';
import type { DateGroup } from '../../utils/dateGrouping';
import { groupNotesByDate } from '../../utils/dateGrouping';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { IconCompose, IconTrash, IconChevronLeft } from '../ui/Icons';
import { createNote, deleteNote } from '../../store/actions';
import '../../styles/layout.css';

export const NoteList = () => {
    const { state, dispatch } = useAppStore();

    // 1. Filter
    const filtered = state.notes.filter(note => {
        const matchesFolder = state.activeFolderId ? note.folderId === state.activeFolderId : true;
        const matchesSearch = state.searchQuery
            ? note.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            note.content.toLowerCase().includes(state.searchQuery.toLowerCase())
            : true;
        return matchesFolder && matchesSearch;
    });

    // 2. Sort
    filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    // 3. Group
    const groups = groupNotesByDate(filtered);
    const groupOrder: DateGroup[] = ['Today', 'Previous 7 Days', 'Previous 30 Days', 'Older'];

    return (
        <div className="notelist-container">
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
                <Button
                    variant="icon"
                    onClick={() => dispatch(createNote(state.activeFolderId || 'personal'))}
                    title="New Note"
                >
                    <IconCompose />
                </Button>
            </div>

            <div className="notelist-scroll">
                {groupOrder.map(groupLabel => {
                    const notes = groups[groupLabel];
                    if (notes.length === 0) return null;

                    return (
                        <div key={groupLabel}>
                            <div className="group-header">{groupLabel}</div>
                            {notes.map(note => (
                                <div
                                    key={note.id}
                                    className={`note-item ${state.activeNoteId === note.id ? 'active' : ''}`}
                                    onClick={() => dispatch({ type: 'SET_ACTIVE_NOTE', payload: note.id })}
                                >
                                    <div className="note-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        {note.title || 'New Note'}
                                        <Button
                                            variant="icon"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (confirm('Delete note?')) dispatch(deleteNote(note.id));
                                            }}
                                            style={{ opacity: 0.5 }}
                                        >
                                            <IconTrash width={14} height={14} />
                                        </Button>
                                    </div>
                                    <div className="note-preview">
                                        {note.content.replace(/<[^>]+>/g, '').slice(0, 60) || 'No additional text'}
                                    </div>
                                    <div style={{ fontSize: 12, opacity: 0.6, marginTop: 4 }}>
                                        {new Date(note.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                })}
            </div>
        </div>
    );
};
