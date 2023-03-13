const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    number : String,
    deviceToken : String
})

const User = mongoose.model('User', userSchema);

module.exports = User;