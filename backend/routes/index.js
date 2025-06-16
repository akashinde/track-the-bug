var express = require('express');
var router = express.Router();

const packageJson = require('../package.json');

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
  res.send({ version: packageJson.version });
});

module.exports = router;
