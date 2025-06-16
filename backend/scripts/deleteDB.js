require('dotenv').config();
const { getClient } = require('../dbconnect');

async function clearCollections() {
    try {
        console.log('Starting to clear all collections...');
        const client = await getClient();
        const db = client.db('track-the-bug');

        // List of collections to clear
        const collections = ['users', 'projects', 'bugs'];

        // Clear each collection
        for (const collection of collections) {
            const result = await db.collection(collection).deleteMany({});
            console.log(`Cleared ${collection} collection: ${result.deletedCount} documents deleted`);
        }

        console.log('All collections cleared successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error clearing collections:', error);
        process.exit(1);
    }
}

clearCollections(); 