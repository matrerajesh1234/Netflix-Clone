const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://netflix-clone:netflixclone123456@cluster0.euurqwu.mongodb.net/');

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
