import { useStore } from '../../store/StoreContext';
import { IconCompose, IconTrash } from '../ui/Icons';
import './Layout.css';

export const NoteList = () => {
    const { state, dispatch } = useStore();

    const filteredNotes = state.notes.filter((note) => {
        // 1. Filter by Folder
        if (state.activeFolderId !== 'all-notes' && note.folderId !== state.activeFolderId) {
            return false;
        }
        // 2. Filter by Search
        if (state.searchQuery) {
            const q = state.searchQuery.toLowerCase();
            return (
                note.title.toLowerCase().includes(q) ||
                note.content.toLowerCase().includes(q)
            );
        }
        return true;
    });

    const handleCreateNote = () => {
        dispatch({
            type: 'ADD_NOTE',
            payload: {
                folderId: state.activeFolderId === 'all-notes' ? 'personal' : state.activeFolderId
            }
        });
    };

    const handleDeleteNote = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (confirm('Are you sure you want to delete this note?')) {
            dispatch({ type: 'DELETE_NOTE', payload: id });
        }
    };

    return (
        <div className="note-list">
            <div className="note-list-header">
                <input
                    type="text"
                    placeholder="Search"
                    className="search-bar"
                    value={state.searchQuery}
                    onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
                />
                <button className="icon-btn" onClick={handleCreateNote} title="New Note">
                    <IconCompose />
                </button>
            </div>
            <div className="note-list-content">
                {filteredNotes.map((note) => (
                    <div
                        key={note.id}
                        className={`note-item ${state.activeNoteId === note.id ? 'active' : ''}`}
                        onClick={() => dispatch({ type: 'SET_ACTIVE_NOTE', payload: note.id })}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            <h4 className="note-title">{note.title}</h4>
                            <button
                                className="delete-btn"
                                onClick={(e) => handleDeleteNote(e, note.id)}
                                title="Delete Note"
                            >
                                <IconTrash />
                            </button>
                        </div>
                        <p className="note-preview">
                            {note.content.replace(/<[^>]+>/g, '').slice(0, 50) || 'No content'}
                        </p>
                        <span className="note-date">
                            {new Date(note.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                ))}
                {filteredNotes.length === 0 && (
                    <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        No notes found
                    </div>
                )}
            </div>
        </div>
    );
};
