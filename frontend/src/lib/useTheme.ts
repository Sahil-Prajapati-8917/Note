import { useAppStore } from '../store/hooks';
import type { ThemeMode } from '../types/theme';

export const useTheme = () => {
    const { state, dispatch } = useAppStore();

    const toggleTheme = () => {
        const next: ThemeMode =
            state.theme === 'light' ? 'dark'
                : state.theme === 'dark' ? 'system'
                    : 'light';

        dispatch({ type: 'SET_THEME', payload: next });
    };

    return {
        theme: state.theme,
        toggleTheme
    };
};
