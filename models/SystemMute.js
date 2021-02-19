const mongoose = require('mongoose');
const SystemMute = new mongoose.Schema({
    guildID: { type: String },
    userID: { type: String },
    rolID: { type: String },
    time: { type: Number }
});
module.exports = mongoose.model('SystemMute', SystemMute);