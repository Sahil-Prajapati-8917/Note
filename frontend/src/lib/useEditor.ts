import { useState } from 'react';

export const useEditor = () => {
    // Placeholder for future advanced editor logic
    // Currently just provides refs/state for the Editor component
    // Separation of concerns pattern
    const [toolbarPos, setToolbarPos] = useState({ top: 0, left: 0 });
    const [showToolbar, setShowToolbar] = useState(false);

    return {
        toolbarPos,
        setToolbarPos,
        showToolbar,
        setShowToolbar
    };
};
