// getting-started.js
var mongoose = require('mongoose');
var UserModel = require('./user.model').UserModel;
// Create schema
var Schema = mongoose.Schema;

/**
 * Order Schema
 */
var OrderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'UserModel' }, 
    status: String,
    reservedFrom: Date,
    reservedTo: Date,
    lastVisit: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
});


OrderSchema.statics = {

    /**
    * Get order
    * @param {ObjectId} id - The objectId of order.
    * @returns {Promise<User, APIError>}
    */
    get(id) {
        return this.findById(id)
            .exec()
            .then((user) => {
                if (user) {
                    return user;
                }
                const err = new Error('No such user exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },

    /**
     * Get all orders for user
     * @param {ObjectId} id - The objectId of user.
     * @returns {Promise<User, APIError>}
     */
    // getUserOrders(userId) {
    //     return this.findOne({})
    //         .exec()
    //         .then((user) => {
    //             if (user) {
    //                 return user;
    //             }
    //             const err = new Error('No such user exists!', '404');
    //             return Promise.reject(err);
    //         });
    // },
 
    /**
     * List orders of all orders
     * @param {number} skip - Number of users to be skipped.
     * @param {number} limit - Limit number of users to be returned.
     * @returns {Promise<User[]>}
     */
    list() {
        return this.find()
            .exec();
    }
}

/**
 * @typedef OrderModel
 */
module.exports = {
    OrderModel: mongoose.model('Order', OrderSchema)
}