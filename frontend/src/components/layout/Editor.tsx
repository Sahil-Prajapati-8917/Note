import { useStore } from '../../store/StoreContext';
import { FloatingToolbar } from '../editor/FloatingToolbar';
import '../editor/Editor.css';
import '../layout/Layout.css';

export const Editor = () => {
    const { state, dispatch } = useStore();
    const activeNote = state.notes.find((n) => n.id === state.activeNoteId);

    if (!activeNote) {
        return (
            <main className="editor" style={{ alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: 'var(--text-secondary)' }}>No note selected</p>
            </main>
        );
    }

    const handleFormat = (command: string, value?: string) => {
        document.execCommand(command, false, value);
        // Manual trigger update because execCommand doesn't always fire input events reliably
        const content = document.querySelector('.editor-body')?.innerHTML;
        if (content) {
            dispatch({
                type: 'UPDATE_NOTE',
                payload: { id: activeNote.id, changes: { content } },
            });
        }
    };

    return (
        <main className="editor">
            <FloatingToolbar onFormat={handleFormat} />
            <div className="editor-content">
                <span className="date-header">
                    {new Date(activeNote.updatedAt).toLocaleString(undefined, {
                        dateStyle: 'long',
                        timeStyle: 'short',
                    })}
                </span>
                <input
                    className="editor-title"
                    value={activeNote.title}
                    onChange={(e) =>
                        dispatch({
                            type: 'UPDATE_NOTE',
                            payload: { id: activeNote.id, changes: { title: e.target.value } },
                        })
                    }
                />
                <div
                    className="editor-body"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                        dispatch({
                            type: 'UPDATE_NOTE',
                            payload: { id: activeNote.id, changes: { content: e.currentTarget.innerHTML } },
                        })
                    }
                    onInput={() => {
                        // Optional: Real-time update, or stick to onBlur for performance?
                        // For "Apple feel" we want auto-save feel, so maybe debounce or onInput is better.
                        // Let's stick to onBlur + manual trigger for now to avoid cursor jumping issues with React re-renders.
                    }}
                    dangerouslySetInnerHTML={{ __html: activeNote.content }}
                />
            </div>
        </main>
    );
};
