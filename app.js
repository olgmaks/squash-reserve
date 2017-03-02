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
let OrderModel = require('./src/model/order.model').OrderModel;

// Express server configuration
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.post('/orders', (req, res) => {

    var userId = req.body.userId;
    var orderBodyJson = req.body;

    UserModel.findById(userId).exec().then((user) => {
        orderBodyJson.user = user;
        new OrderModel(orderBodyJson).save((err, order) => {
            if (err) {
                res.json(err);
            } else {
                res.json(order);
            }
        });
    });

    app.get('/orders', (req, res) => {
        OrderModel.list()
            .then(orders => {
                res.json(orders);
            })
            .catch(e => next(e));
    });

    app.listen(3000, function () {
        console.log('Приклад застосунку, який прослуховує 3000-ий порт!');
    });