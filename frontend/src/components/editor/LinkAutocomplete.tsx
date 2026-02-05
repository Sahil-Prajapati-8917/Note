import { useEffect, useState } from 'react';
import { useAppStore } from '../../store/hooks';
import type { Note } from '../../types/note';
import '../../styles/layout.css';

interface LinkAutocompleteProps {
    query: string;
    position: { top: number; left: number };
    onSelect: (note: Note) => void;
    onClose: () => void;
}

export const LinkAutocomplete = ({ query, position, onSelect, onClose }: LinkAutocompleteProps) => {
    const { state } = useAppStore();
    const [selectedIndex, setSelectedIndex] = useState(0);

    const filteredNotes = state.notes.filter(n =>
        n.title.toLowerCase().includes(query.toLowerCase()) && !n.deletedAt
    ).slice(0, 5); // Limit to 5 results

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedIndex(0);
    }, [query]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(i => Math.min(i + 1, filteredNotes.length - 1));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(i => Math.max(i - 1, 0));
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (filteredNotes[selectedIndex]) {
                    onSelect(filteredNotes[selectedIndex]);
                }
            } else if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [filteredNotes, selectedIndex, onSelect, onClose]);

    if (filteredNotes.length === 0 && query.length > 0) return null;

    return (
        <div
            className="link-autocomplete"
            style={{
                position: 'fixed',
                top: position.top + 24,
                left: position.left,
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                zIndex: 1000,
                minWidth: '200px',
                overflow: 'hidden'
            }}
        >
            {filteredNotes.map((note, index) => (
                <div
                    key={note.id}
                    style={{
                        padding: '8px 12px',
                        cursor: 'pointer',
                        background: index === selectedIndex ? 'var(--accent-color)' : 'transparent',
                        color: index === selectedIndex ? 'white' : 'var(--text-primary)',
                        fontSize: '14px'
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onClick={() => onSelect(note)}
                >
                    {note.title || 'Untitled'}
                </div>
            ))}
            {filteredNotes.length === 0 && query === '' && (
                <div style={{ padding: '8px 12px', color: 'var(--text-secondary)', fontSize: '13px' }}>Type to search...</div>
            )}
        </div>
    );
};
