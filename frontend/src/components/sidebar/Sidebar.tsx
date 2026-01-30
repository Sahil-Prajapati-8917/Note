import { useState } from 'react';
import { useAppStore } from '../../store/AppContext';
import { SidebarHeader } from './SidebarHeader';
import { IconFolder, IconPlus } from '../ui/Icons';
import { CreateFolderModal } from '../CreateFolderModal';
import '../../styles/layout.css';

export const Sidebar = () => {
    const { state, dispatch } = useAppStore();
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

    // Calculate counts
    const getFolderCount = (folderId: string) => {
        return state.notes.filter(n => n.folderId === folderId).length;
    };

    return (
        <aside className="sidebar-container">
            <SidebarHeader />

            <div className="sidebar-section-title">
                On My Mac
            </div>

            <div className="sidebar-content">
                {state.folders.map(folder => (
                    <div
                        key={folder.id}
                        className={`folder-item ${state.activeFolderId === folder.id ? 'active' : ''}`}
                        onClick={() => dispatch({ type: 'SET_ACTIVE_FOLDER', payload: folder.id })}
                    >
                        <IconFolder style={{ width: 18, height: 18, opacity: 0.8 }} />
                        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {folder.name}
                        </span>
                        <span className="folder-count">
                            {getFolderCount(folder.id)}
                        </span>
                    </div>
                ))}
            </div>

            <div className="sidebar-bottom-actions">
                <button
                    className="new-folder-btn"
                    onClick={() => setCreateModalOpen(true)}
                >
                    <IconPlus style={{ width: 16, height: 16 }} />
                    New Folder
                </button>
            </div>

            <CreateFolderModal
                isOpen={isCreateModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onCreate={(name) => dispatch({ type: 'ADD_FOLDER', payload: name })}
            />
        </aside>
    );
};
