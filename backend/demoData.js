const { getClient } = require('./dbconnect');
const bcrypt = require('bcryptjs');

const demoUsers = [
    {
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
        password: 'password123'
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'developer',
        password: 'password123'
    },
    {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        role: 'tester',
        password: 'password123'
    }
];

const demoProjects = [
    {
        name: 'E-commerce Platform',
        description: 'A modern e-commerce platform with real-time inventory management',
        status: 'active',
    },
    {
        name: 'Mobile Banking App',
        description: 'Secure mobile banking application with biometric authentication',
        status: 'active',
    },
    {
        name: 'Task Management System',
        description: 'Collaborative task management system with real-time updates',
        status: 'planning',
    }
];

const demoBugs = [
    {
        title: 'Login Page Not Responsive',
        description: 'Login page breaks on mobile devices with screen width less than 320px',
        status: 'Open',
        priority: 'High',
        type: 'Bug',
    },
    {
        title: 'Payment Gateway Integration Error',
        description: 'Payment gateway returns 500 error when processing transactions above $1000',
        status: 'In Progress',
        priority: 'Critical',
        type: 'Bug',
    },
    {
        title: 'Data Export Functionality Missing',
        description: 'Users cannot export their data in CSV format as specified in requirements',
        status: 'Open',
        priority: 'Medium',
        type: 'Feature',
    },
    {
        title: 'User Authentication Timeout',
        description: 'Users are being logged out after 5 minutes of inactivity instead of the configured 30 minutes',
        status: 'In Progress',
        priority: 'High',
        type: 'Issue',
    },
    {
        title: 'Dark Mode Implementation',
        description: 'Implement dark mode theme for better user experience in low-light conditions',
        status: 'Open',
        priority: 'Low',
        type: 'Feature',
    }
];

async function createDemoData() {
    try {
        const client = await getClient();
        const db = client.db('track-the-bug');

        // Clear existing collections
        await db.collection('users').deleteMany({});
        await db.collection('projects').deleteMany({});
        await db.collection('bugs').deleteMany({});

        // Create users with hashed passwords
        const hashedUsers = await Promise.all(demoUsers.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return {
                ...user,
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date()
            };
        }));

        // Insert users
        const userResult = await db.collection('users').insertMany(hashedUsers);
        const userIds = Object.values(userResult.insertedIds);

        // Add createdBy and assignedTo to projects
        const projectsWithUsers = demoProjects.map((project, index) => ({
            ...project,
            createdBy: userIds[0], // Admin creates all projects
            assignedTo: [userIds[index % userIds.length]],
            createdAt: new Date(),
            updatedAt: new Date()
        }));

        // Insert projects
        const projectResult = await db.collection('projects').insertMany(projectsWithUsers);
        const projectIds = Object.values(projectResult.insertedIds);

        // Add project reference to bugs
        const bugsWithProject = demoBugs.map((bug, index) => ({
            ...bug,
            projectId: projectIds[index % projectIds.length],
            reportedBy: userIds[0],
            assignedTo: [userIds[(index + 1) % userIds.length]],
            createdAt: new Date(),
            updatedAt: new Date()
        }));

        // Insert bugs
        await db.collection('bugs').insertMany(bugsWithProject);

        console.log('Demo data created successfully!');
        return {
            users: userIds,
            projects: projectIds
        };
    } catch (error) {
        console.error('Error creating demo data:', error);
        throw error;
    }
}

module.exports = { createDemoData }; 