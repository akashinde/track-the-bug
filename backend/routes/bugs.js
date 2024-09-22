var express = require('express');
var router = express.Router();
const { getClient } = require('../dbconnect.js');
const { v4: uuidv4 } = require('uuid');

// Function to generate random bug reports
function generateRandomBugs(count) {
  const statuses = ['Open', 'In Progress', 'Resolved', 'Closed'];
  const priorities = ['Low', 'Medium', 'High', 'Critical'];
  const severities = ['Minor', 'Major', 'Critical'];
  const users = ['user123', 'user456', 'user789', 'user101'];
  const projects = ['project1', 'project2', 'project3'];

  return Array.from({ length: count }, () => ({
    title: `Bug ${uuidv4().slice(0, 8)}`,
    description: `This is a randomly generated bug description for ${uuidv4().slice(0, 8)}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    severity: severities[Math.floor(Math.random() * severities.length)],
    reportedBy: users[Math.floor(Math.random() * users.length)],
    assignedTo: users[Math.floor(Math.random() * users.length)],
    projectId: projects[Math.floor(Math.random() * projects.length)],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    comments: [
      {
        userId: users[Math.floor(Math.random() * users.length)],
        comment: "This is a random comment.",
        createdAt: new Date().toISOString()
      }
    ],
    history: [
      {
        status: 'Open',
        changedBy: users[Math.floor(Math.random() * users.length)],
        changedAt: new Date().toISOString()
      }
    ]
  }));
}

/**
 * @swagger
 * /bugs:
 *   get:
 *     summary: Get all bugs
 *     responses:
 *       200:
 *         description: A list of bugs
 */
router.get('/', async function(req, res, next) {
  try {
    const client = await getClient();
    const bugs = client.db('track-the-bug').collection('bugs')
    const result = await bugs.find().toArray();
    res.json(result);
  } catch (error) {
    console.error('Error fetching bugs:', error);
    res.status(500).json({ error: 'An error occurred while fetching bugs' });
  }
});

/**
 * @swagger
 * /bugs/add:
 *   post:
 *     summary: Create a new bug report
 *     description: Create a new bug report with title, description, status, priority, severity, and additional information such as comments and history.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - status
 *               - priority
 *               - severity
 *               - reportedBy
 *               - projectId
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Login button not working"
 *               description:
 *                 type: string
 *                 example: "The login button becomes unresponsive after clicking."
 *               status:
 *                 type: string
 *                 enum: [Open, In Progress, Resolved, Closed]
 *                 example: "Open"
 *               priority:
 *                 type: string
 *                 enum: [Low, Medium, High, Critical]
 *                 example: "High"
 *               severity:
 *                 type: string
 *                 enum: [Minor, Major, Critical]
 *                 example: "Major"
 *               reportedBy:
 *                 type: string
 *                 example: "user123"
 *               assignedTo:
 *                 type: string
 *                 example: "user456"
 *               projectId:
 *                 type: string
 *                 example: "project789"
 *               updatedAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-09-05T10:00:00Z"
 *               comments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: "user456"
 *                     comment:
 *                       type: string
 *                       example: "I am looking into it."
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-03T11:00:00Z"
 *               history:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       enum: [Open, In Progress, Resolved, Closed]
 *                       example: "In Progress"
 *                     changedBy:
 *                       type: string
 *                       example: "user456"
 *                     changedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-03T13:00:00Z"
 *     responses:
 *       200:
 *         description: Bug report created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "bug456"
 *                 message:
 *                   type: string
 *                   example: "Bug report created successfully"
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
    const bugs = client.db('track-the-bug').collection('bugs')
    const result = await bugs.insertOne(data);
    res.json(result);
  } catch (error) {
    console.error('Error creating bug:', error);
    res.status(500).json({ error: 'An error occurred while creating the bug' });
  }
});

/**
 * @swagger
 * /bugs/batch-add:
 *   post:
 *     summary: Add a batch of random bug reports
 *     description: Generates and adds 30 random bug reports to the database.
 *     responses:
 *       200:
 *         description: Batch of bug reports created successfully
 *       500:
 *         description: Server error
 */
router.post('/batch-add', async function (req, res, next) {
  try {
    const client = await getClient();
    const bugs = client.db('track-the-bug').collection('bugs');
    const randomBugs = generateRandomBugs(30);
    const result = await bugs.insertMany(randomBugs);
    res.json({ message: `${result.insertedCount} bug reports created successfully`, ids: result.insertedIds });
  } catch (error) {
    console.error('Error creating batch of bugs:', error);
    res.status(500).json({ error: 'An error occurred while creating the batch of bugs' });
  }
});

module.exports = router;
