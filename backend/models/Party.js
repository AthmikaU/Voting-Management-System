const mongoose = require("mongoose");

const partySchema = new mongoose.Schema({
  party_id: String,
  name: String,
  password: String,
});

module.exports = mongoose.model("Party", partySchema);
