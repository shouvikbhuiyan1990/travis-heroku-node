const connect = require('../db/connection');
const mongoose = require('mongoose');
const validator = require('validator');

const Users = mongoose.model('users', {
    email: {
        type: String,
        required: true,
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
        lowercase: true
    },
    lastname: {
        type: String,
        required: true,
        lowercase: true
    }
});

module.exports = Users;