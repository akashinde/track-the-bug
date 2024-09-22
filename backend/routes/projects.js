const express = require('express');
const router = express.Router();
const { getClient } = require('../dbconnect.js');
const { v4: uuidv4 } = require('uuid');

// Function to generate random projects
function generateRandomProjects(count) {
  const users = ['user123', 'user456', 'user789', 'user101'];
  
  return Array.from({ length: count }, () => ({
    name: `Project ${uuidv4().slice(0, 8)}`,
    description: `This is a randomly generated project description for ${uuidv4().slice(0, 8)}`,
    createdBy: users[Math.floor(Math.random() * users.length)],
    createdAt: new Date().toISOString(),
    teamIds: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => users[Math.floor(Math.random() * users.length)])
  }));
}

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects
 *     responses:
 *       200:
 *         description: A list of projects
 */
router.get('/', async function (req, res, next) {
  const client = await getClient();
  try {
    const projects = client.db('track-the-bug').collection('projects')
    const result = await projects.find().toArray();
    res.json(result);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'An error occurred while fetching projects' });
  }
});

/**
* @swagger
* /projects/add:
*   post:
*     summary: Create a new project
*     description: Create a new project with the provided name, description, created_by, created_at, and team information.
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - name
*               - description
*               - createdBy
*               - teamIds
*             properties:
*               name:
*                 type: string
*                 example: "Bug Tracker App"
*               description:
*                 type: string
*                 example: "A system to track bugs for development teams."
*               createdBy:
*                 type: string
*                 example: "user789"
*               teamIds:
*                 type: array
*                 example:
*                   ["user123", "user456"]
*     responses:
*       200:
*         description: Project created successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 id:
*                   type: string
*                   example: "proj1234"
*                 message:
*                   type: string
*                   example: "Project created successfully"
*       400:
*         description: Bad request
*       500:
*         description: Server error
*/
router.post('/add', async function (req, res, next) {
  const data = req.body;
  data.creadtedAt = new Date().toISOString();
  try {
    const client = await getClient();
    const projects = client.db('track-the-bug').collection('projects')
    const result = await projects.insertOne(data);
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * @swagger
 * /projects/batch-add:
 *   post:
 *     summary: Add a batch of random projects
 *     description: Generates and adds 5 random projects to the database.
 *     responses:
 *       200:
 *         description: Batch of projects created successfully
 *       500:
 *         description: Server error
 */
router.post('/batch-add', async function (req, res, next) {
  try {
    const client = await getClient();
    const projects = client.db('track-the-bug').collection('projects');
    const randomProjects = generateRandomProjects(5);
    const result = await projects.insertMany(randomProjects);
    res.json({ message: `${result.insertedCount} projects created successfully`, ids: result.insertedIds });
  } catch (error) {
    console.error('Error creating batch of projects:', error);
    res.status(500).json({ error: 'An error occurred while creating the batch of projects' });
  }
});

module.exports = router;
