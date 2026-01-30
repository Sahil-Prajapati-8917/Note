import { Button } from '../ui/Button';

interface Props {
    position: { top: number; left: number };
    onFormat?: (command: string, value?: string) => void;
}

export const FloatingToolbar = ({ position, onFormat }: Props) => {
    const exec = (cmd: string, val?: string) => {
        if (onFormat) {
            onFormat(cmd, val);
        } else {
            document.execCommand(cmd, false, val);
        }
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: position.top,
                left: position.left,
                backgroundColor: '#2c2c2e',
                padding: '4px',
                borderRadius: '8px',
                display: 'flex',
                gap: '4px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                zIndex: 100,
                transform: 'translateX(-20%)'
            }}
        >
            <Button size="sm" onClick={() => exec('bold')} style={{ color: '#fff' }}>B</Button>
            <Button size="sm" onClick={() => exec('italic')} style={{ color: '#fff' }}>I</Button>
            <Button size="sm" onClick={() => exec('strikeThrough')} style={{ color: '#fff', textDecoration: 'line-through' }}>S</Button>
            <Button size="sm" onClick={() => exec('formatBlock', 'H1')} style={{ color: '#fff' }}>H1</Button>
            <Button size="sm" onClick={() => exec('formatBlock', 'H2')} style={{ color: '#fff' }}>H2</Button>
        </div>
    );
};
