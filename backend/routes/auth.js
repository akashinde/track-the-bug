var express = require('express');
var router = express.Router();
const { getClient } = require('../dbconnect.js');

router.post('/user/create', async function(req, res, next) {
    const data = req.body;
    data.createdAt = new Date().toISOString();
    try {
        const client = await getClient();
        const auth = client.db('track-the-bug').collection('authentication');
        await auth.insertOne(data);
        res.json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'An error occurred while creating the user' });
    }
});

router.post('/user/login', async function(req, res, next) {
    const data = req.body;
    const client = await getClient();
    const auth = client.db('track-the-bug').collection('authentication');
    const user = await auth.findOne({ username: data.username, password: data.password });
    if (user) {
        console.log(user);
        res.json({ message: 'Login successful', user: user });
    } else {
        console.log('Invalid username or password');
        res.json({ error: 'Invalid username or password' });
    }
});

module.exports = router;
