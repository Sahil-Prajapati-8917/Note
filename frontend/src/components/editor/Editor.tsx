import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../store/AppContext';
import { updateNote } from '../../store/actions';
import { FloatingToolbar } from './FloatingToolbar';
import '../../styles/layout.css';

export const Editor = () => {
    const { state, dispatch } = useAppStore();
    const note = state.notes.find(n => n.id === state.activeNoteId);

    const contentRef = useRef<HTMLDivElement>(null);
    const [showToolbar, setShowToolbar] = useState(false);
    const [toolbarPos, setToolbarPos] = useState({ top: 0, left: 0 });

    // Sync state to UI when active note changes
    useEffect(() => {
        if (!note) return;
        // if (titleRef.current) titleRef.current.value = note.title; // Removed separate title sync
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
        const content = contentRef.current?.innerHTML || '';
        const textContent = contentRef.current?.innerText || '';
        const firstLine = textContent.split('\n')[0].trim();
        const title = firstLine || 'New Note';

        dispatch(updateNote(note.id, {
            title: title.slice(0, 100), // Limit title length
            content: content
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

    const handleFormat = (cmd: string, val?: string) => {
        document.execCommand(cmd, false, val);
    };

    // Format Date: "21 January 2026 at 3:11 PM"
    const formattedDate = new Date(note.updatedAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    }).replace(',', ' at');

    return (
        <div className="editor-container" onClick={() => contentRef.current?.focus()}>
            <div style={{ textAlign: 'center', padding: '10px 0', color: 'var(--text-secondary)', fontSize: '12px' }}>
                {formattedDate}
            </div>

            <div className="editor-content" style={{ maxWidth: 700, margin: '0 auto', width: '100%', padding: '0 40px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Removed separate input */}

                <div
                    ref={contentRef}
                    contentEditable
                    className="editor-body"
                    style={{ fontSize: 17, lineHeight: 1.6, outline: 'none', flex: 1 }}
                    onInput={handleInput}
                    onMouseUp={handleSelect}
                    onKeyUp={handleSelect}
                />
            </div>

            {showToolbar && <FloatingToolbar position={toolbarPos} onFormat={handleFormat} />}
        </div>
    );
};
