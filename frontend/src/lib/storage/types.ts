import { AppState } from '../../store/appReducer';

export interface StorageDriver {
    save(key: string, data: AppState): Promise<void>;
    load(key: string): Promise<AppState | null>;
    clear(key: string): Promise<void>;
}
