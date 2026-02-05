import { LocalStorageDriver } from './localStorage';
import type { StorageDriver } from './types';

const currentDriver: StorageDriver = new LocalStorageDriver();

import type { AppState } from '../../store/appReducer';

export const storageAdapter = {
    save: (key: string, data: AppState) => currentDriver.save(key, data),
    load: (key: string) => currentDriver.load(key),
    clear: (key: string) => currentDriver.clear(key),
};
