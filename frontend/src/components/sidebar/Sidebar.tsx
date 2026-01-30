import { useState } from 'react';
import { useAppStore } from '../../store/AppContext';
import { SidebarHeader } from './SidebarHeader';
import { IconFolder, IconPlus } from '../ui/Icons';
import { CreateFolderModal } from '../CreateFolderModal';
import '../../styles/layout.css';

export const Sidebar = () => {
    const { state, dispatch } = useAppStore();
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

    return (
        <aside className="sidebar-container">
            <SidebarHeader />

            <div className="sidebar-section-title">
                <span style={{ flex: 1 }}>Folders</span>
                <div
                    onClick={() => setCreateModalOpen(true)}
                    style={{ cursor: 'pointer', padding: '8px', margin: '-4px' }}
                >
                    <IconPlus style={{ width: 14, height: 14, opacity: 0.8 }} />
                </div>
            </div>

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

            <CreateFolderModal
                isOpen={isCreateModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onCreate={(name) => dispatch({ type: 'ADD_FOLDER', payload: name })}
            />
        </aside>
    );
};
