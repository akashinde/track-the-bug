var express = require('express');
var router = express.Router();
const { getClient } = require('../dbconnect.js');
const { v4: uuidv4 } = require('uuid');

// Function to generate random users
function generateRandomUsers(count) {
  const roles = ['Developer', 'Tester', 'Project Manager', 'Designer'];
  
  return Array.from({ length: count }, () => ({
    name: `User ${uuidv4().slice(0, 8)}`,
    email: `user${uuidv4().slice(0, 8)}@example.com`,
    role: roles[Math.floor(Math.random() * roles.length)],
    createdAt: new Date().toISOString()
  }));
}

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get('/', async function(req, res, next) {
  try {
    const client = await getClient();
    const users = client.db('track-the-bug').collection('users')
    const result = await users.find().toArray();
    res.json(result);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
});

/**
 * @swagger
 * /users/add:
 *   post:
 *     summary: Creates a new user
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - role
 *               - created_at
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.doe@example.com"
 *               role:
 *                 type: string
 *                 example: "Developer"
 *     responses:
 *       201:
 *         description: Add new user
 */
router.post('/add', async function(req, res, next) {
  const data = req.body;
  data.createdAt = new Date().toISOString();
  try {
    const client = await getClient();
    const users = client.db('track-the-bug').collection('users');
    const result = await users.insertOne(data);
    res.json(result);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'An error occurred while creating the user' });
  }
});

/**
 * @swagger
 * /users/batch-add:
 *   post:
 *     summary: Add a batch of random users
 *     description: Generates and adds 5 random users to the database.
 *     responses:
 *       200:
 *         description: Batch of users created successfully
 *       500:
 *         description: Server error
 */
router.post('/batch-add', async function (req, res, next) {
  try {
    const client = await getClient();
    const users = client.db('track-the-bug').collection('users');
    const randomUsers = generateRandomUsers(5);
    const result = await users.insertMany(randomUsers);
    res.json({ message: `${result.insertedCount} users created successfully`, ids: result.insertedIds });
  } catch (error) {
    console.error('Error creating batch of users:', error);
    res.status(500).json({ error: 'An error occurred while creating the batch of users' });
  }
});

module.exports = router;
