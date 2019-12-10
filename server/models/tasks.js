const connect = require('../db/connection');
const mongoose = require('mongoose');
const validator = require('validator');

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    }
});

const Task = mongoose.model('tasks', schema)

module.exports = Task;