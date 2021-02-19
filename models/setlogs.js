const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  guild: String,
  ChannelID: String,
});
module.exports = mongoose.model("setlogs_data", schema);