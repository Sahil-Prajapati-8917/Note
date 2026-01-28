import { useEffect, useRef, useState } from 'react';
import './Editor.css';

interface FloatingToolbarProps {
    onFormat: (command: string, value?: string) => void;
}

export const FloatingToolbar = ({ onFormat }: FloatingToolbarProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState<{ top: number; left: number } | null>(null);

    useEffect(() => {
        const handleSelectionChange = () => {
            const selection = window.getSelection();
            if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
                setPosition(null);
                return;
            }

            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            // Check if selection is within the editor (optional safety check, but simple for now)
            // For now, we assume if selecting text on screen it's valid.

            if (rect.width === 0 && rect.height === 0) {
                setPosition(null);
                return;
            }

            // Calculate position centered above the selection
            // const editorRect = document.querySelector('.editor-content')?.getBoundingClientRect();

            setPosition({
                top: rect.top - 50, // 50px above selection
                left: rect.left + rect.width / 2, // Centered
            });
        };

        document.addEventListener('selectionchange', handleSelectionChange);
        // Also handle resizing
        window.addEventListener('resize', handleSelectionChange);

        return () => {
            document.removeEventListener('selectionchange', handleSelectionChange);
            window.removeEventListener('resize', handleSelectionChange);
        };
    }, []);

    if (!position) return null;

    const handleAction = (e: React.MouseEvent, command: string, value?: string) => {
        e.preventDefault(); // Prevent losing focus from editor
        onFormat(command, value);
    };

    return (
        <div
            ref={ref}
            className={`floating-toolbar ${position ? 'visible' : ''}`}
            style={{
                top: position.top,
                left: position.left,
                transform: 'translateX(-50%)', // Center alignment
            }}
        >
            <button className="toolbar-btn" onMouseDown={(e) => handleAction(e, 'bold')}>B</button>
            <button className="toolbar-btn" onMouseDown={(e) => handleAction(e, 'italic')}>I</button>
            <button className="toolbar-btn" onMouseDown={(e) => handleAction(e, 'strikeThrough')}>S</button>

            <div className="toolbar-separator" />

            <button className="toolbar-btn" onMouseDown={(e) => handleAction(e, 'formatBlock', 'H1')}>H1</button>
            <button className="toolbar-btn" onMouseDown={(e) => handleAction(e, 'formatBlock', 'H2')}>H2</button>
        </div>
    );
};
