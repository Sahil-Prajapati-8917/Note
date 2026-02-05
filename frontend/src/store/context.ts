import { createContext } from 'react';
import type { AppState } from './appReducer';
import type { AppAction } from './actions';

export interface AppContextProps {
    state: AppState;
    dispatch: React.Dispatch<AppAction>;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);
