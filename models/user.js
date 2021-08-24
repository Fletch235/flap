var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  score: { type: Number, required: false },
});

UserSchema
.virtual('url')
.get(function () {
  return '/catalog/user/'+this._id;
});



var user = mongoose.model('User', UserSchema );
module.exports = user;
