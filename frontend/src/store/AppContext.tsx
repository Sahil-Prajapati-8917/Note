import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import { appReducer, initialState, type AppState } from './appReducer';
import type { AppAction } from './actions';
import { storageAdapter } from '../lib/storage/adapter';

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
        const loadState = async () => {
            const savedState = await storageAdapter.load(STORAGE_KEY);
            if (savedState) {
                dispatch({ type: 'LOAD_STATE', payload: savedState });
            }
        };
        loadState();
    }, []);

    // Save to Storage
    useEffect(() => {
        if (state !== initialState) {
            storageAdapter.save(STORAGE_KEY, state);
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
