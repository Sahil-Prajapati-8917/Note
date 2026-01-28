import { useStore } from '../../store/StoreContext';
import './Layout.css';

export const Sidebar = () => {
    const { state, dispatch } = useStore();

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <span className="window-controls-placeholder"></span>
            </div>
            <div className="sidebar-content">
                <div className="sidebar-section">
                    <h3 className="section-title">Folders</h3>
                    <ul className="folder-list">
                        {state.folders.map((folder) => (
                            <li
                                key={folder.id}
                                className={`folder-item ${state.activeFolderId === folder.id ? 'active' : ''}`}
                                onClick={() => dispatch({ type: 'SET_ACTIVE_FOLDER', payload: folder.id })}
                            >
                                {folder.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    );
};
