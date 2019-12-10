const express = require('express');
const router = new express.Router();
const { auth } = require('../middleware/authenticate');

const Task = require('../models/tasks');

router.post('/task/create', auth, async (req, res) => {

    const task = new Task({
         ...req.body,
         owner: req.user._id
    });
    try {
        await task.save(); 
        res.status(201).send(task);
    }
    catch(e) {
        res.status(400).send(e);
    }
});

router.post('/task/findUserByTask', async (req, res) => {
    try {
        const task = await Task.findOne({ owner: req.body.id });
        await task.populate('owner').execPopulate();
        res.status(201).send(task);
    }
    catch(e) {
        res.status(400).send(e);
    }
});

module.exports = router;