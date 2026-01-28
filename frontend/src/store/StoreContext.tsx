import { createContext, useContext, useReducer, useEffect, type ReactNode, type Dispatch } from 'react';
import type { AppState, Action } from '../types';
import { reducer, initialState } from './reducer';

interface StoreContextProps {
    state: AppState;
    dispatch: Dispatch<Action>;
}

const StoreContext = createContext<StoreContextProps | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'nebula-notes-data';

const getInitialState = (): AppState => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error('Failed to parse saved state', e);
            return initialState;
        }
    }
    return initialState;
};

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState, getInitialState);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
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

        // Listen for system changes if in 'system' mode
        if (state.theme === 'system') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handler = () => applyTheme();
            mediaQuery.addEventListener('change', handler);
            return () => mediaQuery.removeEventListener('change', handler);
        }
    }, [state.theme]);

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
};
