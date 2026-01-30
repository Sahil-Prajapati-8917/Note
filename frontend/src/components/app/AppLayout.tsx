import { Sidebar } from '../sidebar/Sidebar';
import { NoteList } from '../sidebar/NoteList';
import { Editor } from '../editor/Editor';
import { Toolbar } from '../toolbar/Toolbar';
import { useAppStore } from '../../store/AppContext';

export const AppLayout = () => {
    const { state } = useAppStore();
    return (
        <>
            <Toolbar />
            <div className="main-content">
                {state.sidebarVisible && <Sidebar />}
                <NoteList />
                {state.viewMode === 'list' && <Editor />}
            </div>
        </>
    );
};
