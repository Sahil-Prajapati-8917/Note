import { StorageDriver } from './types';
import { AppState } from '../../store/appReducer';

export class LocalStorageDriver implements StorageDriver {
    async save(key: string, data: AppState): Promise<void> {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error('Failed to save state to localStorage:', error);
            throw error;
        }
    }

    async load(key: string): Promise<AppState | null> {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Failed to load state from localStorage:', error);
            return null;
        }
    }

    async clear(key: string): Promise<void> {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Failed to clear state from localStorage:', error);
        }
    }
}
