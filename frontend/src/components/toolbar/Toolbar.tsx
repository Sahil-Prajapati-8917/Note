import { useAppStore } from '../../store/hooks';
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
    IconSearch,
    IconSun,
    IconMoon
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

    const toggleTheme = () => {
        const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
        dispatch({ type: 'SET_THEME', payload: nextTheme });
    };

    return (
        <div className="toolbar-container">
            {/* Left Group: Navigation & View */}
            <div className="toolbar-group">
                <Button
                    variant="icon"
                    onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
                    title="Toggle Sidebar"
                    className={!state.sidebarVisible ? 'active' : ''}
                    style={{ marginRight: 8 }}
                >
                    <IconSidebar />
                </Button>

                {/* Segmented View Toggle */}
                <div className="segmented-control" style={{
                    display: 'flex',
                    backgroundColor: 'var(--bg-hover)',
                    padding: 2,
                    borderRadius: 8,
                    gap: 0,
                    border: '1px solid var(--border-subtle)'
                }}>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            dispatch({ type: 'SET_VIEW_MODE', payload: 'list' });
                        }}
                        title="List View"
                        style={{
                            backgroundColor: isActive('list') ? 'var(--bg-app)' : 'transparent',
                            boxShadow: isActive('list') ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                            borderRadius: 6,
                            height: 24,
                            width: 32,
                            padding: 0,
                            color: isActive('list') ? 'var(--text-primary)' : 'var(--text-secondary)'
                        }}
                    >
                        <IconList width={15} height={15} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            dispatch({ type: 'SET_VIEW_MODE', payload: 'grid' });
                            if (state.sidebarVisible) {
                                dispatch({ type: 'TOGGLE_SIDEBAR' });
                            }
                        }}
                        title="Grid View"
                        style={{
                            backgroundColor: isActive('grid') ? 'var(--bg-app)' : 'transparent',
                            boxShadow: isActive('grid') ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                            borderRadius: 6,
                            height: 24,
                            width: 32,
                            padding: 0,
                            color: isActive('grid') ? 'var(--text-primary)' : 'var(--text-secondary)'
                        }}
                    >
                        <IconGrid width={14} height={14} />
                    </Button>
                </div>

                <div style={{ width: 1, height: 24, backgroundColor: 'var(--border-subtle)', margin: '0 8px' }}></div>

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
                {/* Right Group: Actions */}
                <div className="toolbar-group">
                    <Button variant="icon" title="Toggle Theme" onClick={toggleTheme}>
                        {state.theme === 'dark' ? <IconSun /> : <IconMoon />}
                    </Button>
                    <div style={{ width: 1, height: 16, backgroundColor: 'var(--border-subtle)', margin: '0 4px 0 0' }} />

                    <Button variant="icon" disabled={!isNoteSelected} title="Share">
                        <IconShare />
                    </Button>
                </div>
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
