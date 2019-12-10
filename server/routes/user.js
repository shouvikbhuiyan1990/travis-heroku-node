const express = require('express');
const router = new express.Router();
const { auth } = require('../middleware/authenticate');
const { authLogin } = require('../middleware/authenticate');

const Users = require('../models/users');

router.post('/users/saveOne', async (req, res) => {
    const user = new Users(req.body);
    const token = await user.generateToken();
    try {
        await user.save();
        res.status(201).send(user);
    }
    catch(e) {
        res.status(400).send(e);
    }
});

router.get('/users/getAll',auth, async (req, res) => { 
    // const bakka = new Users();
    try {
        const users = await Users.find({});

        res.status(200).send(users);
    }
    catch(e) {
        res.status(400).send(e);
    }
});

router.post('/users/logout', auth, async (req, res) => { 
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });

        await req.user.save();

        res.send();
    }
    catch(e) {
        res.status(400).send(e);
    }
});

router.get('/users/getTasksByUser', auth, async (req, res) => { 
    try {
        const user = await Users.findById(req.user._id);
        debugger;
        await user.populate('tasks').execPopulate();
        res.send(user.tasks);
    }
    catch(e) {
        res.status(400).send(e);
    }
});

router.post('/users/login', authLogin, async (req, res) => {
    
    try {
        const user = await Users.findByEmailPassword(req.body.email, req.body.password);
        const authToken = req.user && req.user.tokens && req.user.tokens.filter((token) => {
            return token.token === req.token;
        });

        if(authToken && authToken.length > 0) {
            res.send({ error: 'already logged in!' })
        }
        else {
            user.generateToken();
            await user.save();
            res.send(user);
        }
    }
    catch(e) {
        res.status(400).send(e);
    }
});

module.exports = router;