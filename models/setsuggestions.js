const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  guild: String,
  ChannelID: {
    type: String,
    default: "No channel established"
  },
});
module.exports = mongoose.model("setsuggestions_data", schema);