const mongoose = require("mongoose");

const constituencySchema = new mongoose.Schema({
  constituency_id: String,
  name: String,
  password: String,
});

module.exports = mongoose.model("Constituency", constituencySchema);