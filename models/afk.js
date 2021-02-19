const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  id: {type: String, required: true},
  isafk: {type: Boolean, default: false},
  reason: {type: String},
  timeAfk: {type: Number}
});
module.exports = mongoose.model("afk", Schema)