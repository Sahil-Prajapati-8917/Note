import type { ReactNode } from 'react';
import { useShortcuts } from '../../lib/useShortcuts';
import '../../styles/reset.css';
import '../../styles/variables.css';
import '../../styles/layout.css';

export const AppShell = ({ children }: { children: ReactNode }) => {
    useShortcuts(); // Global shortcuts listener

    return (
        <div className="app-shell">
            {children}
        </div>
    );
};
