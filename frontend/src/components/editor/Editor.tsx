import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../store/AppContext';
import { updateNote } from '../../store/actions';
import { FloatingToolbar } from './FloatingToolbar';
import '../../styles/layout.css';

export const Editor = () => {
    const { state, dispatch } = useAppStore();
    const note = state.notes.find(n => n.id === state.activeNoteId);

    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [showToolbar, setShowToolbar] = useState(false);
    const [toolbarPos, setToolbarPos] = useState({ top: 0, left: 0 });

    // Sync state to UI when active note changes
    useEffect(() => {
        if (!note) return;
        if (titleRef.current) titleRef.current.value = note.title;
        if (contentRef.current && contentRef.current.innerHTML !== note.content) {
            contentRef.current.innerHTML = note.content;
        }
    }, [note?.id]);

    if (!note) {
        return (
            <div className="editor-container" style={{ alignItems: 'center', justifyContent: 'center', opacity: 0.3 }}>
                No Note Selected
            </div>
        );
    }

    const handleInput = () => {
        if (!note) return;
        dispatch(updateNote(note.id, {
            title: titleRef.current?.value || '',
            content: contentRef.current?.innerHTML || ''
        }));
    };

    const handleSelect = () => {
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            setToolbarPos({ top: rect.top - 50, left: rect.left });
            setShowToolbar(true);
        } else {
            setShowToolbar(false);
        }
    };

    return (
        <div className="editor-container">
            <div style={{ padding: '20px', textAlign: 'center', fontSize: 12, opacity: 0.4 }}>
                {new Date(note.updatedAt).toLocaleString()}
            </div>

            <div className="editor-content" style={{ maxWidth: 700, margin: '0 auto', width: '100%', padding: '0 40px' }}>
                <input
                    ref={titleRef}
                    className="editor-title"
                    placeholder="Title"
                    style={{ fontSize: 28, fontWeight: 700, width: '100%', marginBottom: 20 }}
                    onChange={handleInput}
                />

                <div
                    ref={contentRef}
                    contentEditable
                    className="editor-body"
                    style={{ fontSize: 17, lineHeight: 1.6, outline: 'none', minHeight: '60vh' }}
                    onInput={handleInput}
                    onMouseUp={handleSelect}
                    onKeyUp={handleSelect}
                />
            </div>

            {showToolbar && <FloatingToolbar position={toolbarPos} />}
        </div>
    );
};
