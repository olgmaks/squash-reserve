var UserModel = require('./src/model/user.model').UserModel;


var express = require('express');
var app = express();

app.get('/', function (req, res) { 
    UserModel.find({})
        .then(users => {
            res.json(users);
        })
        .catch(e => next(e));
});

app.listen(3000, function () {
    console.log('Приклад застосунку, який прослуховує 3000-ий порт!');
});