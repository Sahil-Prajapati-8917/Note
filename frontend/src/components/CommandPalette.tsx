import { useEffect, useState, useRef } from 'react';
import { useAppStore } from '../store/AppContext';
import { IconSearch, IconPlus, IconFolder, IconSun, IconMoon, IconShare } from './ui/Icons';
import { downloadFile, htmlToMarkdown } from '../utils/exportUtils';
import '../styles/layout.css';

interface CommandPaletteProps {
    isOpen: boolean;
    onClose: () => void;
}

type CommandItem = {
    id: string;
    icon: any;
    label: string;
    action: () => void;
    type: 'action' | 'note' | 'folder';
};

export const CommandPalette = ({ isOpen, onClose }: CommandPaletteProps) => {
    const { state, dispatch } = useAppStore();
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setQuery('');
            setSelectedIndex(0);
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const actions: CommandItem[] = [
        {
            id: 'new-note',
            icon: IconPlus,
            label: 'Create New Note',
            action: () => {
                dispatch({ type: 'ADD_NOTE', payload: { folderId: state.activeFolderId || 'personal' } });
                dispatch({ type: 'SET_VIEW_MODE', payload: 'list' });
            },
            type: 'action' as const
        },
        {
            id: 'toggle-theme',
            icon: state.theme === 'dark' ? IconSun : IconMoon,
            label: `Switch to ${state.theme === 'dark' ? 'Light' : 'Dark'} Mode`,
            action: () => dispatch({ type: 'SET_THEME', payload: state.theme === 'dark' ? 'light' : 'dark' }),
            type: 'action' as const
        },
        {
            id: 'export-note',
            icon: IconShare,
            label: 'Export Note to Markdown',
            action: () => {
                const note = state.notes.find(n => n.id === state.activeNoteId);
                if (note) {
                    const md = htmlToMarkdown(note.content);
                    downloadFile(`${note.title || 'Untitled'}.md`, md, 'text/markdown');
                } else {
                    alert('No note selected to export');
                }
            },
            type: 'action' as const
        }
    ];

    const notes: CommandItem[] = state.notes
        .filter(n => !n.deletedAt && (n.title.toLowerCase().includes(query.toLowerCase()) || query === ''))
        .map(n => ({
            id: n.id,
            icon: IconSearch, // Or document icon
            label: n.title || 'Untitled',
            action: () => {
                dispatch({ type: 'SET_ACTIVE_NOTE', payload: n.id });
                dispatch({ type: 'SET_VIEW_MODE', payload: 'list' });
            },
            type: 'note' as const
        })).slice(0, 10);

    const folders: CommandItem[] = state.folders
        .filter(f => f.name.toLowerCase().includes(query.toLowerCase()))
        .map(f => ({
            id: f.id,
            icon: IconFolder,
            label: `Go to ${f.name}`,
            action: () => dispatch({ type: 'SET_ACTIVE_FOLDER', payload: f.id }),
            type: 'folder' as const
        }));

    const allItems = query === ''
        ? [...actions, ...notes]
        : [...actions.filter(a => a.label.toLowerCase().includes(query.toLowerCase())), ...folders, ...notes];

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(i => Math.min(i + 1, allItems.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(i => Math.max(i - 1, 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (allItems[selectedIndex]) {
                allItems[selectedIndex].action();
                onClose();
            }
        } else if (e.key === 'Escape') {
            onClose();
        }
    };

    return (
        <div className="command-palette-overlay" onClick={onClose} style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999,
            display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '15vh'
        }}>
            <div
                className="command-palette-modal"
                onClick={e => e.stopPropagation()}
                style={{
                    width: '600px',
                    maxWidth: '90%',
                    background: 'var(--bg-primary)',
                    borderRadius: '12px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Type a command or search..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        style={{
                            width: '100%',
                            background: 'transparent',
                            border: 'none',
                            fontSize: '18px',
                            color: 'var(--text-primary)',
                            outline: 'none'
                        }}
                    />
                </div>
                <div style={{ maxHeight: '400px', overflowY: 'auto', padding: '8px 0' }}>
                    {allItems.map((item, index) => (
                        <div
                            key={item.id}
                            onClick={() => {
                                item.action();
                                onClose();
                            }}
                            style={{
                                padding: '10px 16px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                background: index === selectedIndex ? 'var(--accent-color)' : 'transparent',
                                color: index === selectedIndex ? 'white' : 'var(--text-primary)',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={() => setSelectedIndex(index)}
                        >
                            <item.icon style={{ width: 18, height: 18, opacity: 0.8 }} />
                            <span>{item.label}</span>
                            {item.type === 'action' && <span style={{ marginLeft: 'auto', fontSize: '12px', opacity: 0.6 }}>Action</span>}
                            {item.type === 'folder' && <span style={{ marginLeft: 'auto', fontSize: '12px', opacity: 0.6 }}>Folder</span>}
                        </div>
                    ))}
                    {allItems.length === 0 && (
                        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                            No results found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
