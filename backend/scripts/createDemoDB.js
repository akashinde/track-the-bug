require('dotenv').config();
const { createDemoData } = require('../demoData');

async function initDemo() {
    try {
        console.log('Starting demo data initialization...');
        const result = await createDemoData();
        console.log('Demo data created successfully!');
        console.log('Created:', {
            users: result.users.length,
            projects: result.projects.length
        });
        process.exit(0);
    } catch (error) {
        console.error('Error creating demo data:', error);
        process.exit(1);
    }
}

initDemo(); 