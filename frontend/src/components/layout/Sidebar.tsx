import { useStore } from '../../store/StoreContext';
import { IconFolder } from '../ui/Icons';
import './Layout.css';

export const Sidebar = () => {
    const { state, dispatch } = useStore();

    const toggleTheme = () => {
        const next = state.theme === 'light' ? 'dark' : state.theme === 'dark' ? 'system' : 'light';
        dispatch({ type: 'SET_THEME', payload: next });
    };

    const getThemeIcon = () => {
        if (state.theme === 'light') return '☀️';
        if (state.theme === 'dark') return '🌙';
        return '⚙️';
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-header" style={{ justifyContent: 'space-between' }}>
                <button
                    className="icon-btn"
                    onClick={toggleTheme}
                    title={`Theme: ${state.theme}`}
                    style={{ fontSize: '14px', width: 'auto', padding: '0 8px', gap: '4px' }}
                >
                    {getThemeIcon()}
                </button>
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
                                <IconFolder className="folder-icon" />
                                {folder.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    );
};
