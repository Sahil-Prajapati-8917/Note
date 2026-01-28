import { useTheme } from '../../lib/useTheme';
import { Button } from '../ui/Button';

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    const getIcon = () => {
        switch (theme) {
            case 'light': return '☀️';
            case 'dark': return '🌙';
            case 'system': return '⚙️';
        }
    };

    return (
        <Button
            variant="icon"
            onClick={toggleTheme}
            title={`Current theme: ${theme}`}
        >
            {getIcon()}
        </Button>
    );
};
