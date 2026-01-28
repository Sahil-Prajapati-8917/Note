import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import { appReducer, initialState, type AppState } from './appReducer';
import type { AppAction } from './actions';

interface AppContextProps {
    state: AppState;
    dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

const STORAGE_KEY = 'nebula-notes-v2';

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    // Load from Storage
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                dispatch({ type: 'LOAD_STATE', payload: parsed });
            } catch (e) {
                console.error('Failed to load state', e);
            }
        }
    }, []);

    // Save to Storage
    useEffect(() => {
        if (state !== initialState) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        }
    }, [state]);

    // Apply Theme
    useEffect(() => {
        const applyTheme = () => {
            const root = document.documentElement;
            const isDark =
                state.theme === 'dark' ||
                (state.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

            if (isDark) {
                root.classList.add('dark-mode');
            } else {
                root.classList.remove('dark-mode');
            }
        };

        applyTheme();

        if (state.theme === 'system') {
            const mq = window.matchMedia('(prefers-color-scheme: dark)');
            mq.addEventListener('change', applyTheme);
            return () => mq.removeEventListener('change', applyTheme);
        }
    }, [state.theme]);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppStore = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('useAppStore must be used within AppProvider');
    return context;
};
