/**
 * @module utils/createFallbackSessionStorage
 * 
 * @function createFallbackSessionStorage
 * @description
 * Creates a fallback session storage object using an in-memory storage.
 * This function returns a storage object that mimics the behavior of the built-in `sessionStorage`.
 * If the `window.sessionStorage` is not available, this fallback storage can be used as a substitute.
 * 
 * @return {Storage} A session storage object with the following methods:
 *   - `getItem(key: string): string|null`: Retrieves the value associated with the given key from the storage.
 *   - `setItem(key: string, value: string): void`: Sets the value for the given key in the storage.
 *   - `removeItem(key: string): void`: Removes the value associated with the given key from the storage.
 *   - `length: number`: Returns the number of key-value pairs currently present in the storage.
 *   - `clear(): void`: Clears all key-value pairs from the storage.
 *   - `key(index: number): string|null`: Retrieves the key at the specified index in the storage.
 */
export const createFallbackSessionStorage = (): Storage => {
    const storage: Record<string, string> = {};
    return {
        getItem: (key) => storage[key] || null,
        setItem: (key, value) => {
            storage[key] = value;
        },
        removeItem: (key) => {
            delete storage[key];
        },
        length: Object.keys(storage).length,
        clear: () => {
            for (const key in storage) {
                if (Object.prototype.hasOwnProperty.call(storage, key)) {
                    delete storage[key];
                }
            }
        },
        key: (index) => Object.keys(storage)[index] || null,
    };
};
