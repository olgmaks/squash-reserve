let mongoose = require('mongoose');
let express = require('express');
let bodyParser = require('body-parser');

// Open connection
mongoose.connect('mongodb://localhost:27017/SquashOrderRegistrationSystemDB');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected successful");
});

// MongoDB model
let UserModel = require('./src/model/user.model').UserModel;


// Express server configuration
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/users', (req, res, next) => {
    UserModel.list()
        .then(users => {
            res.json(users);
        })
        .catch(e => next(e));
});


app.post('/users', (req, res) => {
    let user = new UserModel(req.body);
    user.save((err, user) => {
        if (err) {
            res.json(err);
        } else {
            res.json(user);
        }
    });
});

app.listen(3000, function () {
    console.log('Приклад застосунку, який прослуховує 3000-ий порт!');
});