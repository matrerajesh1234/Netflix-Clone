const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/NetflixProject');

const userSchema =mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      }
});


module.exports = mongoose.model('User', userSchema);
