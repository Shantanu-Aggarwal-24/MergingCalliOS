const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    to : "String",
    from : "String",
    messageDetails : [],
})

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;