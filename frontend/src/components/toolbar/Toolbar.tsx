import { useAppStore } from '../../store/AppContext';
import { createNote, deleteNote } from '../../store/actions';
import {
    IconSidebar,
    IconList,
    IconGrid,
    IconTrash,
    IconCompose,
    IconFormat,
    IconChecklist,
    IconTable,
    IconShare,
    IconLock,
    IconLink,
    IconImage,
    IconSearch
} from '../ui/Icons';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { DeleteConfirmationModal } from '../DeleteConfirmationModal';
import { useState } from 'react';
import '../../styles/layout.css';

export const Toolbar = () => {
    const { state, dispatch } = useAppStore();
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const handleDelete = () => {
        if (state.activeNoteId) {
            setDeleteModalOpen(true);
        }
    };

    const confirmDelete = () => {
        if (state.activeNoteId) {
            dispatch(deleteNote(state.activeNoteId));
        }
    };

    const isActive = (mode: 'list' | 'grid') => state.viewMode === mode;
    const isNoteSelected = !!state.activeNoteId;

    return (
        <div className="toolbar-container">
            {/* Left Group: Navigation & View */}
            <div className="toolbar-group">
                <Button
                    variant="icon"
                    onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
                    title="Toggle Sidebar"
                    className={!state.sidebarVisible ? 'active' : ''} // Optional visual cue
                >
                    <IconSidebar />
                </Button>

                <div className="button-group" style={{ display: 'flex', gap: 0, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 6, padding: 2 }}>
                    <Button
                        variant="icon"
                        size="sm"
                        onClick={() => {
                            dispatch({ type: 'SET_VIEW_MODE', payload: 'list' });
                            // Optional: Re-open sidebar or editor if desired, but user didn't specify.
                        }}
                        title="List View"
                        className={isActive('list') ? 'active-view' : ''}
                        style={{ backgroundColor: isActive('list') ? 'rgba(0,0,0,0.1)' : 'transparent', borderRadius: 4 }}
                    >
                        <IconList width={16} height={16} />
                    </Button>
                    <Button
                        variant="icon"
                        size="sm"
                        onClick={() => {
                            dispatch({ type: 'SET_VIEW_MODE', payload: 'grid' });
                            if (state.sidebarVisible) {
                                dispatch({ type: 'TOGGLE_SIDEBAR' });
                            }
                        }}
                        title="Grid View"
                        className={isActive('grid') ? 'active-view' : ''}
                        style={{ backgroundColor: isActive('grid') ? 'rgba(0,0,0,0.1)' : 'transparent', borderRadius: 4 }}
                    >
                        <IconGrid width={16} height={16} />
                    </Button>
                </div>

                <Button
                    variant="icon"
                    onClick={handleDelete}
                    disabled={!isNoteSelected}
                    title="Delete Note"
                >
                    <IconTrash />
                </Button>
            </div>

            {/* Divider */}
            <div style={{ width: 1, height: 24, backgroundColor: 'var(--border-subtle)', margin: '0 8px' }}></div>

            {/* Middle Group: Editor Tools */}
            <div className="toolbar-group">
                <Button
                    variant="icon"
                    onClick={() => {
                        dispatch(createNote(state.activeFolderId || 'personal'));
                        // If in grid mode, switch to list mode to "open" the note (show editor)
                        if (state.viewMode === 'grid') {
                            dispatch({ type: 'SET_VIEW_MODE', payload: 'list' });
                        }
                    }}
                    title="New Note"
                >
                    <IconCompose />
                </Button>

                <Button variant="icon" disabled={!isNoteSelected} title="Format">
                    <IconFormat />
                </Button>
                <Button
                    variant="icon"
                    onClick={() => { /* Checklist placeholder */ }}
                    disabled={!isNoteSelected}
                    title="Checklist"
                >
                    <IconChecklist />
                </Button>
                <Button
                    variant="icon"
                    onClick={() => { /* Table placeholder */ }}
                    disabled={!isNoteSelected}
                    title="Table"
                >
                    <IconTable />
                </Button>
                <Button variant="icon" disabled={!isNoteSelected} title="Insert Image">
                    <IconImage />
                </Button>

                <div style={{ flex: 1 }}></div>

                <Button variant="icon" disabled={!isNoteSelected} title="Link">
                    <IconLink />
                </Button>
                <Button variant="icon" disabled={!isNoteSelected} title="Lock Note">
                    <IconLock />
                </Button>
                <Button variant="icon" disabled={!isNoteSelected} title="Share">
                    <IconShare />
                </Button>
            </div>

            {/* Right Group: Search */}
            <div className="toolbar-group" style={{ marginLeft: 'auto' }}>
                <Input
                    placeholder="Search"
                    value={state.searchQuery}
                    onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
                    style={{ width: 200, height: 30, fontSize: 13 }}
                    icon={<div style={{ paddingLeft: 8, display: 'flex' }}><IconSearch width={14} height={14} style={{ opacity: 0.5 }} /></div>}
                />
            </div>

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
            />
        </div>
    );
};
