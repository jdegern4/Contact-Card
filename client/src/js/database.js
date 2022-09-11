import { openDB } from 'idb';
import 'regenerator-runtime/runtime';

export const initDB = async () => {
    // Creating new database 'contact_db' which will be using v1 of the database
    openDB('contact_db', 1, {
        // Add database schema if it has not already been initialized
        upgrade(db) {
            if (db.objectStoreNames.contains('contacts')) {
                console.log('contacts store already exists');
                return;
            }
            // Create new object store for the data and give it a key name of 'id' which will increment automatically
            db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });
            console.log('contacts store created');
        }
    })
}