const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
// const mongoClient = require('mongodb').MongoClient;
const Users = require('./models/users');

const { UserProvider } = require('./apis');

// const client = new mongoClient(connectionUrl, { useNewUrlParser: true });

// client.connect((err, client)=> {
//     if(err) {
//         console.log('Not Able to Connect', err);
//     }
//     else {
//         const db = client.db(databaseName);
//         db.collection('users').insertOne({
//             name: 'first',
//             dob: '24/09/1990'
//         });
//     }
// });

const apis = new UserProvider();

app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.post('/saveUsersWithdb', (req, res) => {
    debugger
    const user = new Users(req.body);
    user.save().then(() => {
        res.send(user);
    }).catch((e)=> {
        res.status(400).send(e);
    })
});

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