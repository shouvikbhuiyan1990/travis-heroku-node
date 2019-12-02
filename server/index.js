const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();

const { UserProvider } = require('./apis');


const apis = new UserProvider();

app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/getUsers', function (req, res) {
    apis.fetchAllUsers(function(error, users) {
        res.send(users);
    });
});

app.post('/adduser', function (req, res) {
    apis.addUsers(req.body, function(error,  response) {
        if( !error ) {
            res.send(response);
        }
        else {
            res.send(error, 500);
        }
    });
});

app.get('/finduser/:id', function (req, res) {
    apis.findById(req.params.id, function(error,  response) {
        if( !error ) {
            res.send(response);
        }
        else {
            res.send(error, 500);
        }
    });
});

app.post('/updateByUserId', function (req, res) {
    apis.updateById(req.body.id, req.body.data, function(error, response) {
        if( !error ) {
            res.send(response);
        }
        else {
            res.send(error, 500);
        }
    });
});

app.delete('/deleteuser/:id', function (req, res) {
    apis.deleteById(req.params.id, function(error,  response) {
        if( !error ) {
            res.send(response);
        }
        else {
            res.send(error, 500);
        }
    });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(process.env.PORT || 8080);