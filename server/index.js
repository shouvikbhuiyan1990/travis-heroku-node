const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const userrouter = require('./routes/user');
const taskrouter = require('./routes/task');
// const mongoClient = require('mongodb').MongoClient;
const Users = require('./models/users');

app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.use(userrouter);
app.use(taskrouter);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(process.env.PORT || 8080);