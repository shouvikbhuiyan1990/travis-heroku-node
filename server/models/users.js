const connect = require('../db/connection');
const mongoose = require('mongoose');
const validator = require('validator');

const schema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
        lowercase: true,
        validate( input ) {
            if( !validator.isEmail(input) ) {
                throw new Error('Email is invalid');
            }
        }
    },
    firstname: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    }
});

const Users = mongoose.model('users', schema);

module.exports = Users;