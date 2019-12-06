const express = require('express');
const router = new express.Router();

const Users = require('../models/users');

router.post('/users/saveOne', async (req, res) => {
    const user = new Users(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    }
    catch(e) {
        res.status(400).send(e);
    }
});

router.get('/users/getAll', async (req, res) => {
    // const bakka = new Users();
    try {
        const users = await Users.find({});

        res.status(200).send(users);
    }
    catch(e) {
        res.status(400).send(e);
    }
});

module.exports = router;