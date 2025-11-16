/**
 * Composable for managing persistent data storage using IndexedDB
 * Provides a simple key-value interface similar to localStorage but with better performance and capacity
 */

const DB_NAME = 'soliformations-db';
const DB_VERSION = 1;
const STORE_NAME = 'formations';

interface StorageDB extends IDBDatabase {
  // Type extension for better TypeScript support
}

let dbPromise: Promise<IDBDatabase> | null = null;

/**
 * Initialize and get the IndexedDB database instance
 */
function getDB(): Promise<IDBDatabase> {
  if (dbPromise) {
    return dbPromise;
  }

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Create object store if it doesn't exist
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });

  return dbPromise;
}

/**
 * Get a value from IndexedDB by key
 */
async function getItem(key: string): Promise<string | null> {
  try {
    const db = await getDB();
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(key);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(request.result ?? null);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  } catch (error) {
    console.error('Error getting item from IndexedDB:', error);
    return null;
  }
}

/**
 * Set a value in IndexedDB by key
 */
async function setItem(key: string, value: string): Promise<void> {
  try {
    const db = await getDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.put(value, key);

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => {
        resolve();
      };
      transaction.onerror = () => {
        reject(transaction.error);
      };
    });
  } catch (error) {
    console.error('Error setting item in IndexedDB:', error);
  }
}

/**
 * Remove a value from IndexedDB by key
 */
async function removeItem(key: string): Promise<void> {
  try {
    const db = await getDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.delete(key);

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => {
        resolve();
      };
      transaction.onerror = () => {
        reject(transaction.error);
      };
    });
  } catch (error) {
    console.error('Error removing item from IndexedDB:', error);
  }
}

/**
 * Migrate data from localStorage to IndexedDB
 * This function should be called once when the app loads
 */
async function migrateFromLocalStorage(): Promise<void> {
  // Check if migration has already been done
  const migrationKey = '_migration_completed';
  const migrationDone = await getItem(migrationKey);
  
  if (migrationDone) {
    return; // Already migrated
  }

  // List of keys to migrate
  const keysToMigrate = [
    'formationName',
    'formationDescription',
    'formationDate',
    'formationLocation',
    'formationFont',
    'formationImageData',
  ];

  try {
    // Migrate each key
    for (const key of keysToMigrate) {
      const value = localStorage.getItem(key);
      if (value !== null) {
        await setItem(key, value);
      }
    }

    // Mark migration as complete
    await setItem(migrationKey, 'true');

    // Clean up localStorage (optional - keep for backwards compatibility)
    // Uncomment the following lines to remove data from localStorage after migration
    // for (const key of keysToMigrate) {
    //   localStorage.removeItem(key);
    // }

    console.log('Successfully migrated data from localStorage to IndexedDB');
  } catch (error) {
    console.error('Error migrating from localStorage:', error);
  }
}

/**
 * Composable that provides storage operations using IndexedDB
 */
export function useStorage() {
  return {
    getItem,
    setItem,
    removeItem,
    migrateFromLocalStorage,
  };
}
