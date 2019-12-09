const connect = require('../db/connection');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const schema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
        lowercase: true,
        trim: true,
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
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(input) {
            if (input.toLowerCase().indexOf('password') !== -1) {
                throw new Error('password cannot contain the phrase password');
            }   
        }
    }
});

schema.pre('save', async function (next) {
    const user = this;
    
    if( user.isModified('password') ) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

const Users = mongoose.model('users', schema);

module.exports = Users;