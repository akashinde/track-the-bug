const express = require('express');
const router = express.Router();
const { getClient } = require('../dbconnect.js');

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
    for (const project of result) {
      const users = await client.db('track-the-bug').collection('users').find({ _id: { $in: project.assignedTo.concat(project.createdBy) } }).toArray();
      project.assignedTo = users.map((user) => user.name)
      project.createdBy = users.find((user) => user._id.toString() === project.createdBy.toString()).name
    }
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
  data.updatedAt = new Date().toISOString();
  try {
    const client = await getClient();
    const projects = client.db('track-the-bug').collection('projects')
    const result = await projects.insertOne(data);
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
