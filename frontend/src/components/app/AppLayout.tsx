import { Sidebar } from '../sidebar/Sidebar';
import { NoteList } from '../sidebar/NoteList';
import { Editor } from '../editor/Editor';
import { Toolbar } from '../toolbar/Toolbar';
import { useAppStore } from '../../store/hooks';

export const AppLayout = () => {
    const { state } = useAppStore();
    return (
        <>
            {!state.focusMode && <Toolbar />}
            <div className={`main-content ${state.focusMode ? 'focus-mode' : ''}`} style={state.focusMode ? { justifyContent: 'center' } : {}}>
                {!state.focusMode && state.sidebarVisible && <Sidebar />}
                {!state.focusMode && <NoteList />}
                <Editor />
            </div>
        </>
    );
};
