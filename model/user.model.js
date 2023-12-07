const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    default: 'https://dummy-avatar-url.com/default.jpg', // Replace with your dummy avatar URL
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});


const UserModel = mongoose.model('User', userSchema);

module.exports = {
    UserModel
}
