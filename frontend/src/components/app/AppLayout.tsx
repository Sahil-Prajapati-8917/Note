import { Sidebar } from '../sidebar/Sidebar';
import { NoteList } from '../sidebar/NoteList';
import { Editor } from '../editor/Editor';
import { Toolbar } from '../toolbar/Toolbar';
import { useAppStore } from '../../store/hooks';

import { useState, useEffect } from 'react';

export const AppLayout = () => {
    const { state } = useAppStore();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const showSidebar = state.sidebarVisible || isMobile;

    return (
        <>
            {!state.focusMode && <Toolbar />}
            <div className={`main-content ${state.focusMode ? 'focus-mode' : ''}`} style={state.focusMode ? { justifyContent: 'center' } : {}}>
                {!state.focusMode && showSidebar && <Sidebar />}
                {!state.focusMode && <NoteList />}
                <Editor />
            </div>
        </>
    );
};
