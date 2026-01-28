import { useAppStore } from '../../store/AppContext';
import { SidebarHeader } from './SidebarHeader';
import { IconFolder } from '../ui/Icons';
import '../../styles/layout.css';

export const Sidebar = () => {
    const { state, dispatch } = useAppStore();

    return (
        <aside className="sidebar-container">
            <SidebarHeader />

            <div className="sidebar-section-title">Folders</div>

            <div className="sidebar-content">
                {state.folders.map(folder => (
                    <div
                        key={folder.id}
                        className={`folder-item ${state.activeFolderId === folder.id ? 'active' : ''}`}
                        onClick={() => dispatch({ type: 'SET_ACTIVE_FOLDER', payload: folder.id })}
                    >
                        <IconFolder style={{ width: 18, height: 18, opacity: 0.8 }} />
                        {folder.name}
                    </div>
                ))}
            </div>
        </aside>
    );
};
