import { LocalStorageDriver } from './localStorage';
import { StorageDriver } from './types';

const currentDriver: StorageDriver = new LocalStorageDriver();

export const storageAdapter = {
    save: (key: string, data: any) => currentDriver.save(key, data),
    load: (key: string) => currentDriver.load(key),
    clear: (key: string) => currentDriver.clear(key),
};
