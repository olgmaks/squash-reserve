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
var Schema = mongoose.Schema;


/**
 * User Schema
 */
var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  status: String,
  lastVisit: { type: Date, default: Date.now },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.method({
});

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list() {
    return this.find() 
      .exec();
  }
};

/**
 * @typedef User
 */
module.exports = {
  UserModel: mongoose.model('UserModel', UserSchema)
}
