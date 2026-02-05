import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../store/hooks';
import { updateNote } from '../../store/actions';
import { FloatingToolbar } from './FloatingToolbar';
import { LinkAutocomplete } from './LinkAutocomplete';
import { checkMarkdownTrigger, checkLinkTrigger } from './markdownUtils';
import { AutoSaveIndicator } from '../ui/AutoSaveIndicator';
import '../../styles/layout.css';

export const Editor = () => {
    const { state, dispatch } = useAppStore();
    const note = state.notes.find(n => n.id === state.activeNoteId);

    const contentRef = useRef<HTMLDivElement>(null);
    const [showToolbar, setShowToolbar] = useState(false);
    const [toolbarPos, setToolbarPos] = useState({ top: 0, left: 0 });

    // Link Autocomplete State
    const [showLinkMenu, setShowLinkMenu] = useState(false);
    const [linkQuery, setLinkQuery] = useState('');
    const [linkMenuPos, setLinkMenuPos] = useState({ top: 0, left: 0 });
    const [linkRangeInfo, setLinkRangeInfo] = useState<{ container: Node, offset: number, length: number } | null>(null);


    // Sync state to UI when active note changes
    useEffect(() => {
        if (!note) return;
        if (contentRef.current && contentRef.current.innerHTML !== note.content) {
            contentRef.current.innerHTML = note.content;
        }
    }, [note]);

    if (!note) {
        return (
            <div className="editor-container" style={{ alignItems: 'center', justifyContent: 'center', opacity: 0.3 }}>
                No Note Selected
            </div>
        );
    }

    const processMarkdown = () => {
        const selection = window.getSelection();
        if (!selection?.anchorNode) return;

        const node = selection.anchorNode;
        // Check if node is text node, if so use its textContent
        // If it's an element, parsing might be different, usually we type in text nodes
        const text = node.textContent || '';

        const trigger = checkMarkdownTrigger(text);
        if (trigger) {
            // Found a trigger!
            console.log('Markdown Trigger:', trigger);

            // 1. Remove the trigger chars
            const range = document.createRange();
            range.setStart(node, 0);
            range.setEnd(node, trigger.offset);
            range.deleteContents();

            // 2. Execute command
            if (trigger.command) {
                document.execCommand(trigger.command, false, trigger.value);
            }
        }
    };

    const handleInput = () => {
        if (!note) return;

        // Check for markdown triggers
        processMarkdown();

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
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);

        // 1. Toolbar logic (Selection)
        if (selection.toString().length > 0) {
            const rect = range.getBoundingClientRect();
            setToolbarPos({ top: rect.top - 50, left: rect.left });
            setShowToolbar(true);
            setShowLinkMenu(false); // Hide link menu if selecting text
            return;
        } else {
            setShowToolbar(false);
        }

        // 2. Link Trigger Logic (Caret)
        // Check text before caret in the current node
        const node = range.startContainer;
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent?.slice(0, range.startOffset) || '';
            const linkTrigger = checkLinkTrigger(text);

            if (linkTrigger) {
                const rect = range.getBoundingClientRect();
                setLinkMenuPos({ top: rect.bottom, left: rect.left });
                setLinkQuery(linkTrigger.query);
                setLinkRangeInfo({
                    container: node,
                    offset: range.startOffset,
                    length: linkTrigger.query.length + 2
                });
                setShowLinkMenu(true);
            } else {
                setShowLinkMenu(false);
            }
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

    const handleEditorClick = (e: React.MouseEvent) => {
        if (note.deletedAt) return; // Disable interactions if deleted

        const target = e.target as HTMLElement;
        if (target.tagName === 'A' && target.dataset.noteId) {
            e.preventDefault();
            e.stopPropagation(); // Prevent focusing editor if clicking link?
            dispatch({ type: 'SET_ACTIVE_NOTE', payload: target.dataset.noteId });
            // Switch to list view implicitly?
            dispatch({ type: 'SET_VIEW_MODE', payload: 'list' });
            return;
        }
        contentRef.current?.focus();
    };

    const isTrash = !!note.deletedAt;

    return (
        <div className="editor-container" onClick={handleEditorClick}>
            {isTrash && (
                <div style={{
                    background: 'var(--bg-secondary)',
                    borderBottom: '1px solid var(--border-color)',
                    padding: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    color: 'var(--text-primary)'
                }}>
                    <span style={{ fontSize: '13px' }}>This note is in the Trash.</span>
                    <button
                        onClick={() => dispatch({ type: 'RESTORE_NOTE', payload: note.id })}
                        style={{
                            background: 'var(--accent-color)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '4px 12px',
                            fontSize: '12px',
                            cursor: 'pointer'
                        }}
                    >
                        Restore
                    </button>
                    <button
                        onClick={() => {
                            if (confirm('Delete permanently?')) {
                                dispatch({ type: 'DELETE_NOTE_PERMANENTLY', payload: note.id });
                            }
                        }}
                        style={{
                            background: 'transparent',
                            color: '#ff4d4f',
                            border: '1px solid #ff4d4f',
                            borderRadius: '4px',
                            padding: '4px 12px',
                            fontSize: '12px',
                            cursor: 'pointer'
                        }}
                    >
                        Delete Forever
                    </button>
                </div>
            )}
            <div style={{ textAlign: 'center', padding: '10px 0', color: 'var(--text-secondary)', fontSize: '12px' }}>
                {formattedDate}
            </div>

            <div className="editor-content" style={{ maxWidth: 700, margin: '0 auto', width: '100%', padding: '0 40px', flex: 1, display: 'flex', flexDirection: 'column' }}>


                <div
                    ref={contentRef}
                    contentEditable={!isTrash}
                    className="editor-body"
                    style={{ fontSize: 17, lineHeight: 1.6, outline: 'none', flex: 1, opacity: isTrash ? 0.7 : 1 }}
                    onInput={handleInput}
                    onMouseUp={handleSelect}
                    onKeyUp={handleSelect}
                    onKeyDown={(e) => {
                        if (isTrash) e.preventDefault();
                    }}
                />
            </div>

            {showToolbar && <FloatingToolbar position={toolbarPos} onFormat={handleFormat} />}

            {showLinkMenu && (
                <LinkAutocomplete
                    query={linkQuery}
                    position={linkMenuPos}
                    onClose={() => setShowLinkMenu(false)}
                    onSelect={(targetNote) => {
                        if (!linkRangeInfo) return;

                        // Replace [[query with link
                        const range = document.createRange();
                        const container = linkRangeInfo.container;

                        // container is the text node.
                        // offset is where [[ starts + length of [[query
                        // Wait, logic:
                        // container.textContent ends with [[query
                        // So start is length - query.length - 2

                        const text = container.textContent || '';
                        const matchIndex = text.lastIndexOf('[[');
                        if (matchIndex === -1) return;

                        range.setStart(container, matchIndex);
                        range.setEnd(container, matchIndex + linkQuery.length + 2);
                        range.deleteContents();

                        // Insert Link
                        const a = document.createElement('a');
                        a.href = '#';
                        a.dataset.noteId = targetNote.id;
                        a.innerText = targetNote.title || 'Untitled';
                        a.style.color = 'var(--accent-color)';
                        a.style.textDecoration = 'none';
                        a.contentEditable = 'false';

                        range.insertNode(a);

                        // Add space after
                        const space = document.createTextNode('\u00A0');
                        range.setStartAfter(a);
                        range.insertNode(space);

                        // Reset caret
                        range.setStartAfter(space);
                        range.collapse(true);
                        const sel = window.getSelection();
                        sel?.removeAllRanges();
                        sel?.addRange(range);

                        setShowLinkMenu(false);
                        // Trigger input to save
                        handleInput();
                    }}
                />
            )}
            <AutoSaveIndicator />
        </div>
    );
};
