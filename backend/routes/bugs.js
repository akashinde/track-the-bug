var express = require('express');
var router = express.Router();
const { getClient } = require('../dbconnect.js');
const { ObjectId } = require('mongodb');

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
    for (const bug of result) {
      const users = await client.db('track-the-bug').collection('users').find({ _id: { $in: bug.assignedTo.concat(bug.reportedBy) } }).toArray();
      bug.assignedTo = users.map((user) => user.name)
      bug.reportedBy = users.find((user) => user._id.toString() === bug.reportedBy.toString()).name
      const project = await client.db('track-the-bug').collection('projects').findOne({ _id: bug.projectId });
      bug.projectId = project ? project.name : null
    }
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
  data.projectId = new ObjectId(data.projectId);
  data.reportedBy = new ObjectId(data.reportedBy);
  data.assignedTo = data.assignedTo.map(id => new ObjectId(id));
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

module.exports = router;
