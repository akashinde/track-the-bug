var express = require('express');
var router = express.Router();
const { getClient } = require('../dbconnect.js');

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

module.exports = router;
