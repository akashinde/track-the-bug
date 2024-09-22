var express = require('express');
var router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Root route
 *     responses:
 *       200:
 *         description: Default root route
 */
router.get('/', function(req, res, next) {
  res.send({ title: 'Express' });
});

module.exports = router;
