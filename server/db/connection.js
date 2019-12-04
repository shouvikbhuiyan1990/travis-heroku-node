
const mongoose = require('mongoose');

const dbName = 'user-db';

// const connectionUrl = `mongodb://127.0.0.1:27017/${dbName}`;
const connectionUrl = "mongodb+srv://shouvik:M1234@cluster0-yanec.mongodb.net/test?retryWrites=true&w=majority";

const connect = mongoose.connect(connectionUrl, {
    useNewUrlParser: true
});

module.exports = connect;