// Connection URL
var url = 'mongodb://localhost:27017/SquashOrderRegistrationSystemDB';

// getting-started.js
var mongoose = require('mongoose');
mongoose.connect(url);
 
// Open connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected successful");
});

// Create schema
// var Schema = mongoose.Schema;
 

var UserModel = mongoose.model('User', userSchema);
var OrderModel = mongoose.model('Order', orderSchema);
var RoomModel = mongoose.model('Room', roomSchema);

module.exports = {
    saveUser: () => {
        var user = new UserModel({
            firstName: "TestUserFirstName",
            lastName: "TestUserLastName",
            phone: "+380502323232",
            email: "test@gmail.com",
            status: "active"
        });
        user.save(function (err) {
            if (err) return handleError(err);
            console.log("UserModel has been saved, user=[" + user + "]")
        });
    },
    saveOrder: (user) => {
        var order = new OrderModel({
            user: user,
            reservedFrom: "2017-02-27T13:00:00.000Z",
            reservedTo: "2017-02-27T14:00:00.000Z",
            status: "pending"
        });
        order.save((err) => {
            if (err) return handleError(err);
            console.log("OrderModel has been saved");
        });
    },
    findUser: () => UserModel.findOne({}).exec((err, user) => {
        if (err) {
            console.log("Error occured: " + err);
        } else {
            console.log("Found one user = " + user);
        }
    }).then((user) => {
        saveOrder(user);
    })
}
// OrderModel.find().exec((err, orders) => {
//     console.log("All orders.length : " + orders.length);
// });



// order.save();

// Close connection
// db.close();